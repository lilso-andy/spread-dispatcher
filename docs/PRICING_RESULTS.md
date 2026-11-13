# Pricing baotran1604

## Bằng chứng hiện có

- Mốc so sánh mới là `5f33186967c13fc4d86564c2877490ef3a8e26ce`. Node 24.22.3 chạy đạt 13/13 test offline.
- Benchmark balanced ở revision `2a37b7f` đạt €8.647,13 và 3/3 seed đủ điều kiện xếp hạng, với mức thấp nhất 93,63% ở study-2. Conservative trong benchmark cũ được chạy ở revision khác, nên cần chạy lại cả hai trên cùng code.

## Giả thuyết

- `configs/pricing-baotran1604-fee.json` chỉ nâng feeMultiplier từ 1,20 lên 1,25 so với balanced. Mức sàn phí cao hơn có thể giúp đặt gig sớm và giảm hoàn tiền do trễ. Thay đổi này cũng nâng ước tính chi phí dùng để tính giá tối thiểu, nên cần đo cả tỷ lệ thắng lẫn phí tài xế.
- Nếu phí cao hơn vẫn để nhiều gig được đặt sát lastPickupAt, thử riêng minLeadMinutes 210 hoặc capacityFraction 0,18 để đo tác động lên đúng hạn và số đơn. Mỗi lần đổi một tham số.
- Nếu đơn đặt sớm vẫn có margin thấp, đo độ nhạy với quoteMultiplier 1,45. Với nhóm quote bị chi phối bởi giá sàn, thử riêng minMarginCents 3000 hoặc marginReserve 0,18. Tách theo lane, tỷ lệ giá chào/list price, reference fee và trust của dealer trước khi so sánh tỷ lệ thắng.

## Kiểm chứng practice

Chạy balanced, conservative và ứng viên trên spread-1, study-2, holdout-3 ở level 8. Sau khi chọn ứng viên tăng phí, dùng balanced làm mốc so sánh trên hai seed mới `pricing-baotran1604-check-1` và `pricing-baotran1604-check-2`. Mỗi policy chạy tuần tự, với tối đa hai world đồng thời.

```sh
for policy in balanced conservative pricing-baotran1604-fee; do
  node --env-file=.env evaluate.ts --level 8 --config "configs/${policy}.json" \
    --seeds spread-1,study-2,holdout-3 --output "runs/pricing-${policy}" --reveal
  result=$?
  if [ "$result" -ne 0 ] && [ "$result" -ne 2 ]; then break; fi
done
```

Dùng reveal sau khi tuần kết thúc. Script ghép kết quả quote trong reveal với quyết định trong journal, nhóm theo lane của leg đầu và trust ước tính theo ledger tại lúc quote. Mốc thời gian là lúc post đến từng lần đặt gig, kể cả đặt lại sau drop. Khoảng đệm dùng `lastPickupAt` gần nhất đã thấy tại thời điểm đặt. Reveal ghi cả đơn về sau bị hủy, nên số quote thắng có thể cao hơn `wonOrders` dùng để tính điểm.

```sh
node analysis/pricing.ts runs/pricing-balanced/<worldId>
```

## Quote, booking và ledger

- Trên study-2 với balanced, 161/541 quote thương mại thắng, 499 request bị chủ động từ chối. Tỷ lệ giá chào/list price trung vị là 1,519 ở nhóm thắng và 1,692 ở nhóm thua. Reference fee trung vị tương ứng là 7.771 và 4.480 cent. Lane Helsinki → Vantaa thắng 2/38, Vantaa → Hyvinkää thắng 2/23. Đây là quan sát theo nhóm có cơ cấu giá, tuyến và deadline khác nhau.
- Cũng trên study-2, balanced thắng 56/236 quote khi trust bằng 0, 82/253 khi trust 1–9 và 23/52 khi trust 10–25. Các nhóm khác nhau về dealer và thời điểm, nên tỷ lệ này chưa đo được tác động nhân quả của trust.
- Tăng phí trên study-2 giảm p90 từ post đến booking từ 1.029 xuống 405 phút, và giảm booking trong vòng 180 phút trước mốc cuối từ 12 xuống 10. Trung vị vẫn là 3 phút. Late refund giảm từ 61.435 xuống 45.600 cent, release fee từ 11.431 xuống 6.741 cent. Số đơn tính điểm giảm từ 157 xuống 144.
- Trên spread-1, ứng viên tránh khoản phạt không giao được 34.200 cent mà balanced gặp. Trên holdout-3, late refund tăng từ 1.880 lên 4.700 cent và margin giảm 37.165 cent. Các thay đổi về phí cũng thay đổi giá sàn và tập đơn thắng, nên kết quả đo tác động tổng thể của cấu hình.

## Cấu hình đầy đủ

| Tham số | Balanced | Conservative | Tăng phí |
| --- | ---: | ---: | ---: |
| `quoteMultiplier` | 1.4 | 1.6 | 1.4 |
| `feeMultiplier` | 1.2 | 1.35 | 1.25 |
| `emergencyMultiplier` | 2.4 | 2.4 | 2.4 |
| `marginReserve` | 0.15 | 0.22 | 0.15 |
| `minMarginCents` | 2000 | 4500 | 2000 |
| `capacityFraction` | 0.2 | 0.28 | 0.2 |
| `maxApproachMinutes` | 100 | 100 | 100 |
| `minLeadMinutes` | 180 | 210 | 180 |
| `strictNotes` | true | true | true |
| `offers` | true | true | true |

## Kết quả từng tuần

Mọi world đều là level 8 practice, dùng code dispatcher của `5f33186967c13fc4d86564c2877490ef3a8e26ce`. Các cấu hình tương ứng với bảng đầy đủ ở trên.

### Seed ban đầu

| Cấu hình | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Action refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| Balanced | spread-1 | `wcb83012d522b6b64f80d` | 318867 | 147 | 96.60% | 0.68% | Có | 0 |
| Balanced | study-2 | `w0c75eac21c444ba383f6` | 255843 | 157 | 93.63% | 0.00% | Có | 0 |
| Balanced | holdout-3 | `w120238a5694ac9e57508` | 290003 | 85 | 98.82% | 0.00% | Có | 0 |
| Conservative | spread-1 | `w331bcabdb00e939220cd` | 97720 | 20 | 100.00% | 0.00% | Có | 0 |
| Conservative | study-2 | `wc003574c30df556bab8d` | 339166 | 63 | 98.41% | 0.00% | Có | 0 |
| Conservative | holdout-3 | `w43824851d69824afe2ee` | 41671 | 8 | 100.00% | 0.00% | Có | 0 |
| Tăng phí | spread-1 | `wd8abfd35f7ce8441e19d` | 332093 | 137 | 98.54% | 0.00% | Có | 0 |
| Tăng phí | study-2 | `w6a10fcd895a86fad9983` | 270166 | 144 | 95.14% | 0.00% | Có | 0 |
| Tăng phí | holdout-3 | `w7be1a0519b133c514b03` | 252838 | 76 | 98.68% | 0.00% | Có | 0 |

### Seed kiểm chứng mới

| Cấu hình | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Action refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| Balanced | pricing-baotran1604-check-1 | `w26beb904537b297952f6` | 516621 | 146 | 100.00% | 0.00% | Có | 0 |
| Balanced | pricing-baotran1604-check-2 | `w9392740037698c9afcde` | 191367 | 53 | 100.00% | 0.00% | Có | 0 |
| Tăng phí | pricing-baotran1604-check-1 | `wa4bc9a0f269eb5e413c6` | 437873 | 132 | 100.00% | 0.00% | Có | 0 |
| Tăng phí | pricing-baotran1604-check-2 | `w425d9c7edebe90ef7b21` | 141807 | 41 | 100.00% | 0.00% | Có | 0 |

## So sánh

| Tập seed | Cấu hình | Đủ điều kiện | Tổng margin (cent) | Đúng hạn thấp nhất |
| --- | --- | ---: | ---: | ---: |
| Seed ban đầu | Balanced | 3/3 | 864713 | 93.63% |
| Seed ban đầu | Conservative | 3/3 | 478557 | 98.41% |
| Seed ban đầu | Tăng phí | 3/3 | 855097 | 95.14% |
| Seed kiểm chứng mới | Balanced | 2/2 | 707988 | 100.00% |
| Seed kiểm chứng mới | Tăng phí | 2/2 | 579680 | 100.00% |

Cả 13 tuần đều đủ điều kiện và không có action refusal. Trên ba seed ban đầu, ứng viên đạt mục tiêu dự phòng 95% ở cả ba tuần, so với hai tuần của balanced, và giảm tổng margin 9.516 cent. Trên hai seed mới, hai cấu hình cùng đạt 100% đúng hạn, còn ứng viên giảm tổng margin 128.308 cent và thắng ít hơn 26 đơn.

**Đề xuất:** ưu tiên balanced nếu mục tiêu là tối đa hóa margin với ngưỡng 90%. Giữ cấu hình tăng phí để tham chiếu nếu đội ưu tiên biên dự phòng 95%. Kết quả hiện có chưa đủ để đổi mặc định. Các giả thuyết thay đổi giá, sàn margin, công suất và lead time chưa được chạy; thử riêng nếu cần cải thiện biên dự phòng mà giữ volume.

Để tái lập hai seed mới, dùng balanced và cấu hình tăng phí với `--seeds pricing-baotran1604-check-1,pricing-baotran1604-check-2`. Bảng trên lấy điểm cuối tuần từ API practice.

## Tối ưu hóa sau vòng thử nghiệm đầu

Bảng level 8 vòng Saturday 00:00 hiển thị Team co Tai với 0/5 lượt kết thúc. Đội dẫn đầu Juhus có €80.030,02 và 97,48% đúng hạn trên năm lượt, tương đương €16.006/tuần và 373 đơn/tuần. Bob the builders đạt €73.387,76 và 98,00%, khoảng €14.678/tuần và 301 đơn/tuần. Nguồn: [Bảng level 8](https://spread.bahnexpress.com/v1/leaderboards/practice?level=8). Đây là mốc tham chiếu từ các tuần ranking; seed practice của nhóm khác với seed ranking.

Trong ba lượt balanced, phí tài xế chiếm €42.423,06 trên €52.289,00 doanh thu (81,1%). Khoảng 210–220 yêu cầu mỗi tuần bị loại với lý do `unrecognized note`, trong đó có nhiều ghi chú chỉ dặn mang lốp dự phòng. `study-2` là seed gây áp lực về giao đúng hạn và hoàn tiền.

### Practice level 8

Các lượt mới chạy trên `b7425dd`. Các lượt balanced ban đầu dùng cùng code dispatcher ở `5f33186`. Dưới đây là điểm cuối tuần.

| Cấu hình | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| Balanced | spread-1 | `wcb83012d522b6b64f80d` | 318867 | 147 | 96.60% | 0.68% | Có | 0 |
| Balanced | study-2 | `w0c75eac21c444ba383f6` | 255843 | 157 | 93.63% | 0.00% | Có | 0 |
| Balanced | holdout-3 | `w120238a5694ac9e57508` | 290003 | 85 | 98.82% | 0.00% | Có | 0 |
| Throughput | spread-1 | `w0e962fb90b296286c5fe` | 396212 | 210 | 98.10% | 0.00% | Có | 0 |
| Throughput | study-2 | `wc4a8d613db42a410819b` | 73427 | 210 | 91.43% | 0.00% | Có | 0 |
| Throughput | holdout-3 | `wce3f59135821f2b04fbf` | 264727 | 119 | 95.80% | 0.00% | Có | 0 |
| Cost | spread-1 | `w768a2359de7a673150d6` | 466421 | 173 | 97.69% | 0.00% | Có | 0 |
| Cost | study-2 | `w0774e938a788a4644b82` | 245691 | 182 | 91.21% | 0.00% | Có | 0 |
| Cost | holdout-3 | `w45fa25366fa317fb7eb3` | 337406 | 103 | 96.12% | 0.00% | Có | 0 |
| Moderate | spread-1 | `wa06771f4e78b284368de` | 304899 | 140 | 96.43% | 0.00% | Có | 0 |
| Moderate | study-2 | `w519baf4dfe665028480b` | 191197 | 159 | 91.82% | 0.00% | Có | 0 |
| Moderate | holdout-3 | `w9fda5e6d91402907763f` | 315466 | 93 | 98.92% | 0.00% | Có | 0 |
| Note exposure | spread-1 | `w0cf2940eaa5daebb3ffa` | 557389 | 220 | 96.82% | 0.00% | Có | 0 |
| Note exposure | study-2 | `w54e5fcc7d572b2cc12b6` | 216733 | 191 | 90.05% | 0.00% | Có | 0 |
| Note exposure | holdout-3 | `wa75d4d2a3eac9454f1c7` | 285214 | 131 | 93.13% | 0.00% | Có | 0 |
| Balanced · mới | pricing-optimization-a | `w224aef167c74220b97ca` | 158710 | 93 | 92.47% | 0.00% | Có | 0 |
| Balanced · mới | pricing-optimization-b | `w8b3374c5c8fe0edd72f8` | 344780 | 104 | 100.00% | 0.00% | Có | 0 |
| Cost · mới | pricing-optimization-a | `w137406f7e3cbbd13bac0` | 253502 | 126 | 91.27% | 0.00% | Có | 0 |
| Cost · mới | pricing-optimization-b | `w7b2a4d2da7acfd1b11d2` | 446800 | 133 | 98.50% | 0.00% | Có | 0 |

| Cấu hình | Đủ điều kiện | Tổng margin (cent) | Đúng hạn thấp nhất |
| --- | ---: | ---: | ---: |
| Balanced | 3/3 | 864713 | 93.63% |
| Throughput | 3/3 | 734366 | 91.43% |
| Cost | 3/3 | 1049518 | 91.21% |
| Moderate | 3/3 | 811562 | 91.82% |
| Note exposure | 3/3 | 1059336 | 90.05% |
| Balanced · mới | 2/2 | 503490 | 92.47% |
| Cost · mới | 2/2 | 700302 | 91.27% |

### Cấu hình đầy đủ

- Balanced · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.2, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- Throughput · `{"quoteMultiplier": 1.34, "feeMultiplier": 1.2, "emergencyMultiplier": 2.4, "marginReserve": 0.12, "minMarginCents": 1200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- Cost · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- Moderate · `{"quoteMultiplier": 1.37, "feeMultiplier": 1.2, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.24, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- Note exposure · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": false, "offers": true}`
- Balanced · mới · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.2, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- Cost · mới · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`

### Quyết định

- **Cost là ứng viên practice có tín hiệu tăng margin nhất quán giữa hai tập seed.** Giảm `feeMultiplier` xuống 1,08 đồng thời mở `capacityFraction` lên 0,28. So với balanced, tổng margin tăng 21,4% trên ba seed ban đầu và 39,1% trên hai seed mới. Cả năm tuần đều vượt 90%, nhưng mức thấp nhất giảm từ 92,47% xuống 91,21% và còn xa mục tiêu 98%. Hai tham số thay đổi đồng thời, nên chưa biết đóng góp riêng của từng tham số.
- **Throughput và Moderate:** tổng margin thấp hơn balanced trên ba seed ban đầu. Trên study-2, Throughput tăng số đơn từ 157 lên 210, nhưng tiền hoàn do trễ tăng từ €614,35 lên €1.457,90 và margin giảm còn €734,27. Moderate cũng giảm cả margin và tỷ lệ đúng hạn trên seed này.
- **Note exposure:** nới toàn bộ ghi chú giúp tăng tổng margin trên tập ban đầu nhưng study-2 chỉ đạt 90,05%. Chỉ dùng cấu hình này cho practice. Trong hai reveal đầu, 36 đơn có ghi chú liên quan đến lốp mà parser chưa hiểu không có ràng buộc bổ sung so với request; 12/58 đơn còn lại có ít nhất một ràng buộc bổ sung. Nhóm phụ trách parser có thể bắt đầu với các câu độc lập chỉ dặn mang lốp dự phòng, rồi đối chiếu giờ, yêu cầu xe và trạng thái lốp trên seed mới.
- **Định giá tuyến khó:** với balanced trên study-2, bảy đơn có điểm đến đầu tiên là Rovaniemi thu €2.372,00, trả €2.946,44 phí tài xế và €336,00 hoàn tiền. Cùng điểm đến trên holdout-3 có lãi €301,81. Nên thử tăng giá sàn theo chi phí đặt xe, số tài xế phù hợp quanh cả hai đầu tuyến và biên thời gian còn lại. Dùng tín hiệu quan sát được trong tuần và kiểm chứng riêng các tuyến dài, thay vì chặn cố định theo tên thành phố.
- **Ghép chuyến:** để nâng margin trên mỗi đơn, ưu tiên thử ghép chuyến khứ hồi hoặc cùng bãi, dựa trên khoảng chạy rỗng và chi phí hai gig riêng. Chỉ so các route có cửa sổ pickup/delivery khả thi, tối đa 720 phút chạy đường cho nhiều xe và giữ đúng thứ tự handover của trade-in. Đây là đề xuất cho module điều phối và chưa được benchmark.

Tất cả 16 tuần practice mới đều đủ điều kiện. Giữ balanced làm cấu hình tham chiếu cho đến khi ứng viên đạt biên đúng hạn tốt hơn trên seed mới. Mức €16.006/tuần của đội dẫn đầu vẫn ngoài phạm vi số liệu đã đạt.

## Ranking vòng Saturday 00:00

Level 8, season 4, Team co Tai. Mọi lượt dùng `pricing-baotran1604-cost.json` ở revision `d6099b4`; cột Chính sách chỉ ra lượt có điều chỉnh giá sàn. Mọi số liệu lấy sau khi world kết thúc.

| Lượt | World ID | Chính sách | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| 1 | `wc0b1604d38967965565e` | Cost | 597703 | 175 | 97.71% | 0.00% | Có | 0 |
| 2 | `w99bc7e3ba7ce81c7b7a0` | Cost + giá sàn tuyến dài | 558520 | 155 | 98.71% | 0.00% | Có | 0 |
| 3 | `w8c387aa4f63c1911b6c4` | Cost + giá sàn tuyến dài | 538505 | 153 | 95.42% | 0.00% | Có | 0 |
| 4 | `w5a751b82e5efa7ef8fc5` | Cost + giá sàn tuyến dài | 718936 | 174 | 99.43% | 0.00% | Có | 0 |
| 5 | `w5bcfa80fef6b9ac79276` | Cost + giá sàn tuyến dài | 741233 | 207 | 96.62% | 0.00% | Có | 0 |

### Thử nghiệm quyết định chính sách

Đã chạy ở hai bản sao độc lập của `d6099b4`, cùng cấu hình Cost và cùng level 8. Lượt ranking thứ nhất dùng Cost. Sau khi thử nghiệm đạt ngưỡng giao hàng trên các seed đối chứng, các lượt sau dùng Cost với giá sàn theo tuyến dài.

- **Giá sàn tuyến dài.** Với route có ít nhất 360 phút lái và dưới 12 tài xế đủ điều kiện có nhà cách điểm giao cuối không quá 45 phút lái, cộng 0,35 lần reference fee vào chi phí ước tính dùng để đặt giá sàn. Phí gig tiếp tục dùng cấu hình Cost. Ước tính này dùng roster và bản đồ công khai trong world.
- **Ghi chú lốp dự phòng.** Cho qua các câu độc lập đã biết về việc mang theo bộ lốp phụ, giữ cách xử lý cũ cho các ghi chú khác. Thử nghiệm bị loại sau khi study-2 chỉ đạt 89,60% đúng hạn. Tăng thêm số đơn an toàn về mặt ghi chú vẫn có thể làm giảm công suất còn lại cho các đơn khác.

| Chính sách | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| Giá sàn tuyến dài | study-2 | `w66d5568e9585597083e2` | 406921 | 191 | 92.15% | 0.00% | Có | 0 |
| Giá sàn tuyến dài | pricing-optimization-a | `wa2053933d714a126ef63` | 471540 | 145 | 95.17% | 0.00% | Có | 0 |
| Giá sàn tuyến dài | holdout-3 | `wbf60caee7b9789af1c68` | 311195 | 98 | 95.92% | 0.00% | Có | 0 |
| Giá sàn tuyến dài | pricing-optimization-b | `w6cff398f9752bc4d864d` | 418796 | 131 | 96.95% | 0.00% | Có | 0 |
| Giá sàn tuyến dài | spread-1 | `wa9a4dfa3da24128fc010` | 461870 | 171 | 98.25% | 0.00% | Có | 0 |
| Ghi chú lốp dự phòng | study-2 | `w018130c1853f51032ec1` | 206763 | 202 | 89.60% | 0.00% | **Không** | 0 |
| Ghi chú lốp dự phòng | pricing-optimization-a | `w1d01f9f9e1c252244973` | 182140 | 96 | 91.67% | 0.00% | Có | 0 |
| Ghi chú lốp dự phòng | holdout-3 | `wbe31ae3469fd25bd1456` | 413192 | 108 | 98.15% | 0.00% | Có | 0 |

Trên study-2, pricing-optimization-a và holdout-3, tổng margin của giá sàn tuyến dài tăng từ €8.365,99 lên €11.896,56 và đúng hạn thấp nhất tăng từ 91,21% lên 92,15%. Các seed khác nhau giữa những lượt ranking, vì vậy dùng đối chứng practice để đánh giá thay đổi chính sách.

Phần thử nghiệm code nằm trong bản sao riêng. Diff để người phụ trách ghép sau khi review nằm ở cuối báo cáo.

```diff
--- a/desk.ts
+++ b/desk.ts
@@ -257 +257,7 @@
-      const fee = request.referenceFeeCents * (this.feeMultiplier(place) + scarcity)
+      const longHaul = this.level === 8 && route.driveMinutes >= 360
+      const deliveryPlace = order.legs.at(-1)!.delivery.placeId
+      const homewardDrivers = longHaul ? this.roster.filter((driver) =>
+        eligible(driver, route.experienced, route.manual)
+        && this.network.road(driver.homePlaceId, deliveryPlace).minutes <= 45).length : Infinity
+      const riskReserve = longHaul && homewardDrivers < 12 ? 0.35 : 0
+      const fee = request.referenceFeeCents * (this.feeMultiplier(place) + scarcity + riskReserve)

```

Bảng xếp hạng xác nhận **hạng 25**, tổng margin **€31.548,97**, **97,57% đúng hạn** và **864 đơn**. Đội dẫn đầu Juhus đạt €80.030,02 và 97,48% trên 1.866 đơn. Margin trung bình là €36,52/đơn cho Team co Tai và €42,89/đơn cho Juhus. Chênh lệch số đơn là điểm cần ưu tiên, với ngưỡng giao đúng hạn theo từng tuần. Vòng này đã hết năm lượt.

## Practice trên bản tích hợp của nhóm

Bản thử nghiệm lấy từ `origin/work/dispatcher-profit` tại `5e5e4ad`, áp dụng diff production và test bỏ reprice trùng của `origin/work/dispatcher-reliability` tại `f997df7`. Hai nhánh chưa vào `origin/main` (`5f33186`). Không có nhánh notes riêng trong refs đã fetch. Cả hai bản đối chứng dùng cấu hình Cost đầy đủ ở trên và đạt 29/29 test offline trên Node 24.22.3. Ứng viên thêm đúng diff giá sàn tuyến dài trong mục ranking. Các thay đổi dispatcher chỉ nằm trong bản sao kiểm chứng.

| Seed | World tích hợp | Margin | Đúng hạn | Đơn thắng | World có giá sàn | Margin | Đúng hạn | Đơn thắng |
| --- | --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| study-2 | `w2eba8c27802efaf01b50` | €3,020.26 | 90.86% | 175 | `w48451f2940ca4be00241` | €4,041.52 | 92.82% | 195 |
| quote-unseen-01 | `we0ad91803149eb9f83d5` | €8,328.47 | 96.77% | 217 | `w65500fa10a8a72a67e40` | €8,021.14 | 97.16% | 211 |
| quote-unseen-02 | `w7e49127e5226b7493fda` | €6,120.56 | 99.43% | 176 | `wf1614442459f8ebcfa2e` | €6,713.95 | 100.00% | 178 |
| integration-20261114-a | `wc1ab24ef956902c6e00b` | €3,531.18 | 92.81% | 139 | `w4093e0df37c211ab2764` | €3,365.38 | 92.03% | 138 |
| integration-20261114-b | `w7dc9d051e12e8e62b8d1` | €10,366.16 | 98.88% | 268 | `wf16a27ac1b6fb674dcd3` | €11,377.32 | 99.26% | 270 |

- Ba seed đã biết: €17,469.29 → €18,776.61 (+7.48%).
- Hai seed mới: €13,897.34 → €14,742.70 (+6.08%).

Lượt dưới 90% hoặc không đủ điều kiện: không có.
Tổng action refusals: 0. Tổng số lượt có đơn chưa giao: 0.

Ứng viên đạt €33.519,31 trên năm seed, cao hơn 6,86% so với €31.366,63 của bản tích hợp đối chứng. Mức đúng hạn thấp nhất là 92,03% so với 90,86%; trên riêng hai seed mới, mức thấp nhất giảm từ 92,81% xuống 92,03%. Kết quả tốt nhất là €11.377,32 với 270 đơn và 99,26% đúng hạn. Seed mới còn lại giảm €165,80, vì vậy giá sàn theo tuyến là ứng viên tốt hơn về tổng margin nhưng cần tiếp tục kiểm chứng độ ổn định.

Để tái lập, xuất source ở `5e5e4ad` vào thư mục riêng, áp dụng diff `git diff 5f33186 f997df7 -- desk.ts test/dispatch-reliability.test.ts` cho cả hai bản, rồi áp dụng diff giá sàn trong mục trước vào bản ứng viên với `git apply --unidiff-zero`. Chạy `evaluate.ts` ở level 8 với cấu hình Cost và cùng seed từ bảng trên. Sau khi fetch lại, nhánh `work/env-setup` ở `81f4040` chỉ thêm thiết lập môi trường và tài liệu, nên không đổi bản dispatcher đã kiểm chứng.
