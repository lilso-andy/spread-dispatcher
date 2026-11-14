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

### Kiểm tra lại sau khi push và fetch

Giảm riêng `capacityFraction` từ 0,28 xuống 0,24 trên bản tích hợp có giá sàn. Mọi trường cấu hình khác giữ theo Cost.

| Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| integration-20261114-b | `w77fc70fc4b2249799e0a` | 1091261 | 264 | 99.62% | 0.00% | Có | 0 |
| study-2 | `w793063eae5fdab1c77c0` | 354369 | 166 | 90.96% | 0.00% | Có | 0 |
| integration-20261114-a | `wfeeb2bb56ff6696ffe4b` | 396507 | 132 | 94.70% | 0.00% | Có | 0 |

Cả ba tuần đạt ngưỡng 90%. Tổng margin giảm từ €18.784,22 xuống €18.421,37, mức đúng hạn thấp nhất giảm từ 92,03% xuống 90,96%. Giữ 0,28 cho ứng viên hiện tại. Local main đã đồng bộ `9dccfdb`; các file dispatcher và test offline của main giữ nguyên so với `5f33186`.

## Pricing practice level 1–7

Bản chạy dùng `3cb7ba4` từ nhánh dispatcher-integration (gồm thay đổi fixed-price của nhóm) cộng diff parser và test notes từ `5f33186..2678287`. Cả hai cấu hình dùng cùng source và Node 24.22.3. Bộ test tích hợp đạt 61/61. Chỉ tạo practice thường, tối đa hai world của phiên này chạy đồng thời. Các world đang dở của đồng đội được giữ nguyên.

Level 1–3 dùng giá danh sách cố định. Ứng viên thử sàn đóng góp thấp hơn, thời gian tìm tài xế dài hơn và phí cứu đơn thấp hơn. Level 4–7 thử mở công suất và giảm sàn margin. Trên level 4–6, dispatcher dùng hệ số giá cơ sở 1,20 và sàn phí tài xế 1,05; hai hệ số cấu hình tương ứng chỉ có tác dụng ở level 7 trong nhóm này.

| Level | Cấu hình | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| 1 | holdout-baseline | multilevel-holdout-b | `w9cfd6273bcf3a1ea0431` | 213383 | 185 | 98.92% | 0.00% | Có | 0 |
| 1 | followup | multilevel-holdout-b | `w83d280b4898a76723fd7` | 272199 | 270 | 99.63% | 0.00% | Có | 0 |
| 1 | baseline | multilevel-verify-a | `wfeac127c2fea99e4f9ca` | 194218 | 176 | 99.43% | 0.00% | Có | 0 |
| 1 | candidate | multilevel-verify-a | `w448154165056fe1341fd` | 254406 | 231 | 99.57% | 0.00% | Có | 0 |
| 1 | baseline | spread-1 | `waf056c70795294114e9e` | 218244 | 196 | 99.49% | 0.00% | Có | 0 |
| 1 | candidate | spread-1 | `wd6fa064dfc4d6d1e7f0e` | 292595 | 269 | 99.63% | 0.00% | Có | 0 |
| 2 | holdout-baseline | multilevel-holdout-b | `w81695e9ae45c00bc9731` | 215498 | 185 | 98.92% | 0.00% | Có | 0 |
| 2 | followup | multilevel-holdout-b | `wb81d0e13cf95713f8981` | 281042 | 271 | 98.89% | 0.00% | Có | 0 |
| 2 | baseline | multilevel-verify-a | `wc17a377a5e6586ed5dcc` | 191191 | 175 | 99.43% | 0.00% | Có | 0 |
| 2 | candidate | multilevel-verify-a | `w53389aa0a56fdc01c1d7` | 259157 | 231 | 99.57% | 0.00% | Có | 0 |
| 2 | baseline | spread-1 | `w9849dcd05e70323de31c` | 227432 | 197 | 99.49% | 0.00% | Có | 0 |
| 2 | candidate | spread-1 | `w7a3ab178497abf69dfaf` | 303009 | 270 | 99.63% | 0.00% | Có | 0 |
| 3 | holdout-baseline | multilevel-holdout-b | `w4b9123400b63adbdec9e` | 224179 | 185 | 98.92% | 0.00% | Có | 0 |
| 3 | followup | multilevel-holdout-b | `we30d5a158a285b9c8ab6` | 287528 | 271 | 98.89% | 0.00% | Có | 0 |
| 3 | baseline | multilevel-verify-a | `wc0e7142bc502ebdc547d` | 188207 | 175 | 99.43% | 0.00% | Có | 0 |
| 3 | candidate | multilevel-verify-a | `w260aec1d326caa4821e2` | 262295 | 232 | 99.57% | 0.00% | Có | 0 |
| 3 | baseline | spread-1 | `w49b612bc85deb0aa606d` | 230153 | 197 | 99.49% | 0.00% | Có | 0 |
| 3 | candidate | spread-1 | `w9f0b4dd6ec0dce417bb8` | 308464 | 270 | 99.63% | 0.00% | Có | 0 |
| 4 | holdout-baseline | multilevel-holdout-b | `w540b786681f328a67dfe` | 135595 | 49 | 100.00% | 0.00% | Có | 0 |
| 4 | followup | multilevel-holdout-b | `wce8e32a8914b2aaa273e` | 153907 | 62 | 100.00% | 0.00% | Có | 0 |
| 4 | baseline | multilevel-verify-a | `w3f7de264b7e359165aaa` | 265454 | 84 | 100.00% | 0.00% | Có | 0 |
| 4 | candidate | multilevel-verify-a | `wef46085217d778faacac` | 282401 | 106 | 100.00% | 0.00% | Có | 0 |
| 4 | baseline | spread-1 | `wd0a335200ca918d84f6e` | 177888 | 76 | 100.00% | 0.00% | Có | 0 |
| 4 | candidate | spread-1 | `w2d86d6ea734dff1a4af4` | 210654 | 108 | 99.07% | 0.00% | Có | 0 |
| 5 | holdout-baseline | multilevel-holdout-b | `w375826ea418c07e1e849` | 93205 | 31 | 100.00% | 0.00% | Có | 0 |
| 5 | followup | multilevel-holdout-b | `w2a8f2eef4297af0200b9` | 100551 | 38 | 100.00% | 0.00% | Có | 0 |
| 5 | baseline | multilevel-verify-a | `wd3e47d4a3ab2d68030ce` | 186047 | 57 | 100.00% | 0.00% | Có | 0 |
| 5 | candidate | multilevel-verify-a | `w2b88f6818edb85c8509a` | 202286 | 76 | 98.68% | 0.00% | Có | 0 |
| 5 | baseline | spread-1 | `w0629b64ed4461ce072b8` | 120436 | 54 | 100.00% | 0.00% | Có | 0 |
| 5 | candidate | spread-1 | `wc47bea40bedce8e4b879` | 137788 | 71 | 100.00% | 0.00% | Có | 0 |
| 6 | holdout-baseline | multilevel-holdout-b | `w777c73fa75030070ba96` | 95293 | 32 | 100.00% | 0.00% | Có | 0 |
| 6 | followup | multilevel-holdout-b | `w176f258d8eab8e574d3b` | 102560 | 39 | 100.00% | 0.00% | Có | 0 |
| 6 | baseline | multilevel-verify-a | `w945466937096bc81cf0e` | 239020 | 75 | 100.00% | 0.00% | Có | 0 |
| 6 | candidate | multilevel-verify-a | `w199e75a19fa75c5d70dc` | 251664 | 95 | 100.00% | 0.00% | Có | 0 |
| 6 | baseline | spread-1 | `w29dee8770332484811e3` | 131043 | 58 | 100.00% | 0.00% | Có | 0 |
| 6 | candidate | spread-1 | `wec1ef904ca510bfd711b` | 148050 | 73 | 100.00% | 0.00% | Có | 0 |
| 7 | holdout-baseline | multilevel-holdout-b | `wa44c7c76428399984de5` | 203704 | 70 | 100.00% | 0.00% | Có | 0 |
| 7 | followup | multilevel-holdout-b | `w2e41710d6fd324ffa538` | 369062 | 129 | 100.00% | 0.00% | Có | 0 |
| 7 | baseline | multilevel-verify-a | `w9a7cbd90baab93d78056` | 435946 | 154 | 98.70% | 0.00% | Có | 0 |
| 7 | candidate | multilevel-verify-a | `w9cf916439c76596720dd` | 523589 | 207 | 99.03% | 0.00% | Có | 0 |
| 7 | baseline | spread-1 | `wf22488974534b7bae079` | 257866 | 101 | 100.00% | 0.00% | Có | 0 |
| 7 | candidate | spread-1 | `w175410200ff9c4c2677f` | 399977 | 172 | 99.42% | 0.00% | Có | 0 |

### So sánh theo level

| Level | Số seed ghép cặp | Balanced (cent) | Ứng viên (cent) | Đúng hạn thấp nhất Balanced | Đúng hạn thấp nhất ứng viên | Quyết định trên tập đã đo |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 2 | 412462 | 547001 | 99.43% | 99.57% | Ứng viên |
| 2 | 2 | 418623 | 562166 | 99.43% | 99.57% | Ứng viên |
| 3 | 2 | 418360 | 570759 | 99.43% | 99.57% | Ứng viên |
| 4 | 2 | 443342 | 493055 | 100.00% | 99.07% | Ứng viên |
| 5 | 2 | 306483 | 340074 | 100.00% | 98.68% | Ứng viên |
| 6 | 2 | 370063 | 399714 | 100.00% | 100.00% | Ứng viên |
| 7 | 2 | 693812 | 923566 | 98.70% | 99.03% | Ứng viên |

### Cấu hình đầy đủ

- holdout-baseline, level 1, 2, 3, 4, 5, 6, 7 · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.2, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- followup, level 1, 2, 3 · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, level 1, 2, 3, 4, 5, 6, 7 · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.4, "marginReserve": 0.15, "minMarginCents": 2000, "capacityFraction": 0.2, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- candidate, level 1, 2, 3 · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- followup, level 4, 5, 6, 7 · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- candidate, level 4, 5, 6, 7 · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`

### Đối chứng seed mới multilevel-holdout-b

| Level | Balanced (cent) | Ứng viên (cent) | Chênh lệch | Đúng hạn Balanced | Đúng hạn ứng viên |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 213383 | 272199 | +27.56% | 98.92% | 99.63% |
| 2 | 215498 | 281042 | +30.42% | 98.92% | 98.89% |
| 3 | 224179 | 287528 | +28.26% | 98.92% | 98.89% |
| 4 | 135595 | 153907 | +13.50% | 100.00% | 100.00% |
| 5 | 93205 | 100551 | +7.88% | 100.00% | 100.00% |
| 6 | 95293 | 102560 | +7.63% | 100.00% | 100.00% |
| 7 | 203704 | 369062 | +81.18% | 100.00% | 100.00% |

Ứng viên tăng margin ở 7/7 level trên seed mới. Tỷ lệ đủ điều kiện ở cả hai cấu hình: 7/7 và 7/7. Mỗi level chỉ được đo trên ba seed, nên kết quả xác định cấu hình tốt nhất trong các phương án đã thử.

### Kiểm tra lại sau khi cập nhật parser

Sau khi push và fetch, áp dụng diff notes `2678287..ea47940` lên bản tích hợp ở trên. 65/65 test offline đạt. Chạy đối chứng practice trên `multilevel-holdout-b` cho level 5–7.

| Level | Cấu hình | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| 5 | balanced | `w326d298c18effb98e20a` | 93689 | 32 | 100.00% | 0.00% | Có | 0 |
| 5 | pricing-baotran1604-competitive | `w2ea05bca109ac427ec27` | 102782 | 40 | 100.00% | 0.00% | Có | 0 |
| 6 | balanced | `w96cbfc12b6e5e113a79e` | 95777 | 33 | 100.00% | 0.00% | Có | 0 |
| 6 | pricing-baotran1604-competitive | `w5b3049a2516192e78aef` | 104791 | 41 | 100.00% | 0.00% | Có | 0 |
| 7 | balanced | `we8242e03ca4a3608a336` | 212254 | 76 | 98.68% | 0.00% | Có | 0 |
| 7 | pricing-baotran1604-competitive | `w1952b93562a1f6d4e8c1` | 425713 | 149 | 100.00% | 0.00% | Có | 0 |

## Tối ưu theo từng tham số

Bản kiểm chứng dùng dispatcher-integration `3cb7ba4` và parser `ea47940`. Mỗi vòng chỉ đổi một tham số từ cấu hình đang dẫn đầu trên level tương ứng. Chỉ chọn ứng viên tăng tổng margin và đạt 90% đúng hạn trên cả hai seed `spread-1` và `multilevel-holdout-b`. Hai seed này được dùng để tune. Seed mới ở cuối mục dùng để kiểm tra mức cải thiện ngoài tập tune.

### Level 2

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 584051 | 98.89% | 2/2 |
| 01-capacityFraction | baseline | `capacityFraction=0.32` | 591230 | 99.26% | 2/2 |
| 02-marginReserve | 01-capacityFraction | `marginReserve=0.07` | 649207 | 99.34% | 2/2 |
| 03-minLeadMinutes | 02-marginReserve | `minLeadMinutes=270` | 638335 | 98.97% | 2/2 |
| 04-emergencyMultiplier | 02-marginReserve | `emergencyMultiplier=1.9` | 650305 | 99.34% | 2/2 |
| 05-minMarginCents | 04-emergencyMultiplier | `minMarginCents=250` | 689755 | 99.71% | 2/2 |

Đang dẫn đầu: `05-minMarginCents`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `w57b9c34f7f62e8d5a434` | 303009 | 270 | 99.63% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `wfd99442fd9d9895a46ee` | 281042 | 271 | 98.89% | 0.00% | Có | 0 |
| 01-capacityFraction | spread-1 | `wfd35261f5800b3f73470` | 303009 | 270 | 99.63% | 0.00% | Có | 0 |
| 01-capacityFraction | multilevel-holdout-b | `wc40de892111fd9dd6201` | 288221 | 272 | 99.26% | 0.00% | Có | 0 |
| 02-marginReserve | spread-1 | `wf8e11e6bc65fe1f9b7a3` | 340563 | 320 | 99.38% | 0.00% | Có | 0 |
| 02-marginReserve | multilevel-holdout-b | `w63fbbbf9b620cb8b525c` | 308644 | 302 | 99.34% | 0.00% | Có | 0 |
| 03-minLeadMinutes | spread-1 | `w2fdc5ba991d1923eb306` | 329313 | 300 | 99.67% | 0.00% | Có | 0 |
| 03-minLeadMinutes | multilevel-holdout-b | `w3b39505188ef089bf378` | 309022 | 291 | 98.97% | 0.00% | Có | 0 |
| 04-emergencyMultiplier | spread-1 | `wde30ec71703d7a92f3c6` | 340841 | 320 | 99.38% | 0.00% | Có | 0 |
| 04-emergencyMultiplier | multilevel-holdout-b | `we18b899b058a73833bc7` | 309464 | 302 | 99.34% | 0.00% | Có | 0 |
| 05-minMarginCents | spread-1 | `w6067093eda378360dd8e` | 357543 | 363 | 100.00% | 0.00% | Có | 0 |
| 05-minMarginCents | multilevel-holdout-b | `weaecc46c39804a34463b` | 332212 | 340 | 99.71% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- 01-capacityFraction · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- 02-marginReserve · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.07, "minMarginCents": 500, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- 03-minLeadMinutes · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.07, "minMarginCents": 500, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 270, "strictNotes": true, "offers": true}`
- 04-emergencyMultiplier · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.07, "minMarginCents": 500, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- 05-minMarginCents · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.07, "minMarginCents": 250, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Level 6

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 265275 | 98.80% | 2/2 |
| 01-minMarginCents | baseline | `minMarginCents=1100` | 311113 | 99.12% | 2/2 |
| 02-capacityFraction | 01-minMarginCents | `capacityFraction=0.35` | 311113 | 99.12% | 2/2 |
| 03-marginReserve | 01-minMarginCents | `marginReserve=0.1` | 308733 | 99.14% | 2/2 |
| 04-minLeadMinutes | 01-minMarginCents | `minLeadMinutes=240` | 302822 | 99.07% | 2/2 |
| 05-emergencyMultiplier | 01-minMarginCents | `emergencyMultiplier=2.1` | 311532 | 99.12% | 2/2 |

Đang dẫn đầu: `05-emergencyMultiplier`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `w1050d4e65775342761f0` | 160484 | 83 | 98.80% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `w94c13ec18f5acf17ada6` | 104791 | 41 | 100.00% | 0.00% | Có | 0 |
| 01-minMarginCents | spread-1 | `w6da8740a0092127f91c5` | 185449 | 114 | 99.12% | 0.00% | Có | 0 |
| 01-minMarginCents | multilevel-holdout-b | `wf60724819687c67e9d24` | 125664 | 60 | 100.00% | 0.00% | Có | 0 |
| 02-capacityFraction | spread-1 | `w9955679b0bcb00ebcc26` | 185449 | 114 | 99.12% | 0.00% | Có | 0 |
| 02-capacityFraction | multilevel-holdout-b | `w48caade0ee1f4028d9b8` | 125664 | 60 | 100.00% | 0.00% | Có | 0 |
| 03-marginReserve | spread-1 | `w67f685a8ce5794b2ea3e` | 185169 | 116 | 99.14% | 0.00% | Có | 0 |
| 03-marginReserve | multilevel-holdout-b | `web080e2357be0c037136` | 123564 | 60 | 100.00% | 0.00% | Có | 0 |
| 04-minLeadMinutes | spread-1 | `w54fc5021bdca9f698d3a` | 178372 | 107 | 99.07% | 0.00% | Có | 0 |
| 04-minLeadMinutes | multilevel-holdout-b | `w195f9121b67fc13c281c` | 124450 | 59 | 100.00% | 0.00% | Có | 0 |
| 05-emergencyMultiplier | spread-1 | `wb925180bed81e09106a1` | 185868 | 114 | 99.12% | 0.00% | Có | 0 |
| 05-emergencyMultiplier | multilevel-holdout-b | `wade0a7635491ec0b41c3` | 125664 | 60 | 100.00% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 01-minMarginCents · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1100, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 02-capacityFraction · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1100, "capacityFraction": 0.35, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 03-marginReserve · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.1, "minMarginCents": 1100, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 04-minLeadMinutes · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1100, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 240, "strictNotes": true, "offers": true}`
- 05-emergencyMultiplier · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.1, "marginReserve": 0.13, "minMarginCents": 1100, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`

### Level 7

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 871126 | 98.98% | 2/2 |
| 01-quoteMultiplier | baseline | `quoteMultiplier=1.31` | 851358 | 98.78% | 2/2 |
| 02-feeMultiplier | baseline | `feeMultiplier=1.03` | 853986 | 97.77% | 2/2 |
| 03-capacityFraction | baseline | `capacityFraction=0.34` | 863072 | 98.98% | 2/2 |
| 04-minLeadMinutes | baseline | `minLeadMinutes=240` | 845587 | 98.92% | 2/2 |
| 05-marginReserve | baseline | `marginReserve=0.1` | 863704 | 98.99% | 2/2 |

Đang dẫn đầu: `baseline`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `wc844a3666116a78ee8c3` | 445413 | 197 | 98.98% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `w7c856839b9b853fb1291` | 425713 | 149 | 100.00% | 0.00% | Có | 0 |
| 01-quoteMultiplier | spread-1 | `w9c5dcd245077372780f0` | 470327 | 215 | 99.07% | 0.00% | Có | 0 |
| 01-quoteMultiplier | multilevel-holdout-b | `wffaacbdd2edd2dc58f5a` | 381031 | 164 | 98.78% | 0.00% | Có | 0 |
| 02-feeMultiplier | spread-1 | `w1eacd8f3c8084489a859` | 422812 | 179 | 97.77% | 0.00% | Có | 0 |
| 02-feeMultiplier | multilevel-holdout-b | `wf6bd37298087f83514c3` | 431174 | 154 | 99.35% | 0.00% | Có | 0 |
| 03-capacityFraction | spread-1 | `wd27ad5c8d5fdc1923402` | 445413 | 197 | 98.98% | 0.00% | Có | 0 |
| 03-capacityFraction | multilevel-holdout-b | `wdec330412cbd2d52e599` | 417659 | 151 | 99.34% | 0.00% | Có | 0 |
| 04-minLeadMinutes | spread-1 | `w8a84694ce9f5904021a1` | 444136 | 185 | 98.92% | 0.00% | Có | 0 |
| 04-minLeadMinutes | multilevel-holdout-b | `w018d3c01a999ed9cfe5a` | 401451 | 142 | 99.30% | 0.00% | Có | 0 |
| 05-marginReserve | spread-1 | `w2552617defb1e6b20eb7` | 463848 | 198 | 98.99% | 0.00% | Có | 0 |
| 05-marginReserve | multilevel-holdout-b | `w4a7663b8880cfddcfb7b` | 399856 | 147 | 99.32% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 01-quoteMultiplier · `{"quoteMultiplier": 1.31, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 02-feeMultiplier · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.03, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 03-capacityFraction · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.34, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 04-minLeadMinutes · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 240, "strictNotes": true, "offers": true}`
- 05-marginReserve · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.1, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`

### Level 1

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 564794 | 99.63% | 2/2 |
| 01-capacityFraction | baseline | `capacityFraction=0.32` | 567968 | 99.63% | 2/2 |

Đang dẫn đầu: `01-capacityFraction`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `w95a850edb742aa20c43e` | 292595 | 269 | 99.63% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `w60a05bdee913a1ff82f4` | 272199 | 270 | 99.63% | 0.00% | Có | 0 |
| 01-capacityFraction | spread-1 | `w409ab1fd84da627f3e63` | 293634 | 270 | 99.63% | 0.00% | Có | 0 |
| 01-capacityFraction | multilevel-holdout-b | `w1e306156f22d4c3a2708` | 274334 | 272 | 99.63% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- 01-capacityFraction · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Level 3

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 595992 | 98.89% | 2/2 |
| 01-marginReserve | baseline | `marginReserve=0.07` | 650482 | 99.33% | 2/2 |

Đang dẫn đầu: `01-marginReserve`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `wec58f3d8ce711d9e1596` | 308464 | 270 | 99.63% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `w59eb5183e7838f8e6f24` | 287528 | 271 | 98.89% | 0.00% | Có | 0 |
| 01-marginReserve | spread-1 | `w2a4f0673b33ae06a7f71` | 339857 | 316 | 99.68% | 0.00% | Có | 0 |
| 01-marginReserve | multilevel-holdout-b | `w572858ff79803dd08531` | 310625 | 300 | 99.33% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.1, "minMarginCents": 500, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- 01-marginReserve · `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.07, "minMarginCents": 500, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Level 4

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 364561 | 99.07% | 2/2 |
| 01-capacityFraction | baseline | `capacityFraction=0.34` | 364561 | 99.07% | 2/2 |

Đang dẫn đầu: `baseline`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `wd9f192c8e12a532a8598` | 210654 | 108 | 99.07% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `w1bc66137469de3503384` | 153907 | 62 | 100.00% | 0.00% | Có | 0 |
| 01-capacityFraction | spread-1 | `w1453434867b70690d114` | 210654 | 108 | 99.07% | 0.00% | Có | 0 |
| 01-capacityFraction | multilevel-holdout-b | `w111051faa5fd50d69c0e` | 153907 | 62 | 100.00% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 01-capacityFraction · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.34, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`

### Level 5

| Lượt | So với | Thay đổi | Margin (cent) | Thấp nhất | Đủ điều kiện |
| --- | --- | --- | ---: | ---: | ---: |
| baseline | — | Cấu hình đã công bố | 248711 | 98.80% | 2/2 |
| 01-minMarginCents | baseline | `minMarginCents=1100` | 289000 | 99.07% | 2/2 |

Đang dẫn đầu: `01-minMarginCents`.

| Lượt | Seed | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| baseline | spread-1 | `wafb118bdf04c9d5073e6` | 145929 | 83 | 98.80% | 0.00% | Có | 0 |
| baseline | multilevel-holdout-b | `w5a65816848e0b03648ad` | 102782 | 40 | 100.00% | 0.00% | Có | 0 |
| 01-minMarginCents | spread-1 | `w1d83631fef21ad5ffd62` | 165420 | 107 | 99.07% | 0.00% | Có | 0 |
| 01-minMarginCents | multilevel-holdout-b | `w8324010121ad43a7ee08` | 123580 | 59 | 100.00% | 0.00% | Có | 0 |

Cấu hình đầy đủ cho từng lượt.

- baseline · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1600, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`
- 01-minMarginCents · `{"quoteMultiplier": 1.35, "feeMultiplier": 1.08, "emergencyMultiplier": 2.4, "marginReserve": 0.13, "minMarginCents": 1100, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 180, "strictNotes": true, "offers": true}`

### Kiểm chứng seed mới sau các thử nghiệm

Cùng seed `pricing-final-check-c`, so cấu hình đã công bố với ứng viên thắng trên tập tune. Bản tích hợp dispatcher giữ `3cb7ba4` và lần lượt cập nhật parser sang `f1eae8b` và `f632abc`. Bộ test offline lần lượt đạt 67/67 và 68/68. So sánh trong từng phiên bản parser.

| Parser | Level | Cấu hình | World ID | Margin (cent) | Đơn thắng | Đúng hạn | Chưa giao | Đủ điều kiện | Refusals |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| `f1eae8b` | 1 | baseline | `wd5aee4af1bc8c1a4d417` | 276736 | 263 | 99.24% | 0.00% | Có | 0 |
| `f1eae8b` | 1 | best | `wcbc9ec329b3d113b8e6c` | 276736 | 263 | 99.24% | 0.00% | Có | 0 |
| `f1eae8b` | 2 | baseline | `w355a9cb8ef1feda1de7d` | 280430 | 263 | 98.86% | 0.00% | Có | 0 |
| `f1eae8b` | 2 | best | `w1e38bd5e4329f1c7b6d5` | 316248 | 352 | 99.43% | 0.00% | Có | 0 |
| `f1eae8b` | 3 | baseline | `w06b3a18a067f7cde04ad` | 283748 | 263 | 98.86% | 0.00% | Có | 0 |
| `f1eae8b` | 3 | best | `wdf4aea1c1b1a2f352478` | 288173 | 301 | 99.34% | 0.00% | Có | 0 |
| `f1eae8b` | 5 | baseline | `wd8b487ee16a17c0ecd56` | 168071 | 60 | 100.00% | 0.00% | Có | 0 |
| `f1eae8b` | 5 | best | `w16f923d5e8f3e8a182ec` | 182922 | 72 | 100.00% | 0.00% | Có | 0 |
| `f1eae8b` | 6 | baseline | `wcdb52a25360b38147b66` | 239496 | 91 | 100.00% | 0.00% | Có | 0 |
| `f1eae8b` | 6 | best | `wd8bc41b2eab0189b94db` | 234403 | 98 | 100.00% | 0.00% | Có | 0 |
| `f632abc` | 2 | baseline | `we1fce9c37adcf31d67b9` | 280430 | 263 | 98.86% | 0.00% | Có | 0 |
| `f632abc` | 2 | best | `w99f2f7e4d2d1fd445a13` | 316248 | 352 | 99.43% | 0.00% | Có | 0 |
| `f632abc` | 3 | baseline | `w1700c4173b31288f3ee8` | 283748 | 263 | 98.86% | 0.00% | Có | 0 |
| `f632abc` | 3 | best | `w0f178e1ad3fd8f3627e3` | 288173 | 301 | 99.34% | 0.00% | Có | 0 |
| `f632abc` | 5 | baseline | `we1df4061d0ff116b4424` | 168071 | 60 | 100.00% | 0.00% | Có | 0 |
| `f632abc` | 5 | best | `w29a975a5c8b5f6e82510` | 182922 | 72 | 100.00% | 0.00% | Có | 0 |

### Cấu hình chọn sau kiểm chứng

Level 1 hòa trên seed mới, level 6 giảm margin, và level 4/7 không có thay đổi nào thắng trên tập tune. Giữ cấu hình đã công bố cho bốn level đó.
- Level 2: dùng `pricing-baotran1604-level-2.json`, tăng 12.77% trên seed mới ở parser `f632abc`.
- Level 3: dùng `pricing-baotran1604-level-3.json`, tăng 1.56% trên seed mới ở parser `f632abc`.
- Level 5: dùng `pricing-baotran1604-level-5.json`, tăng 8.84% trên seed mới ở parser `f632abc`.

19 thử nghiệm chia theo level 1–7 là 1/5/1/1/1/5/5. Đợt tiếp theo nên xoay vòng các level để mỗi level được thử cùng số lượt trước khi ưu tiên thêm theo kết quả. Không dùng ranking hay final.

### Practice pricing vòng level 1

Source dispatcher 3cb7ba4 + parser 471f06d. Thử `capacityFraction=0.36`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `w6ed30521bf2ab56aa0b0` · `{"marginCents": 347781, "revenueCents": 2632300, "marginShare": 0.1321205789613646, "wonOrders": 419, "onTimeShare": 0.9976133651551312, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w08b4b99e68575b16d487` · `{"marginCents": 358223, "revenueCents": 2645100, "marginShare": 0.13542890627953574, "wonOrders": 422, "onTimeShare": 0.995260663507109, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.36, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `wdd87612b14533c6803e9` · `{"marginCents": 321515, "revenueCents": 2792400, "marginShare": 0.11513930668958602, "wonOrders": 439, "onTimeShare": 0.9908883826879271, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `wa1584b14e28f5705b889` · `{"marginCents": 325782, "revenueCents": 2809300, "marginShare": 0.11596554301783363, "wonOrders": 441, "onTimeShare": 0.9909297052154195, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.36, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, pricing-three-holdout-d, `w95b4b9c4c0a7fb5061a7` · `{"marginCents": 409086, "revenueCents": 2754500, "marginShare": 0.14851552005808677, "wonOrders": 434, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, pricing-three-holdout-d, `w8a61105d8e1b3976ce85` · `{"marginCents": 405249, "revenueCents": 2785200, "marginShare": 0.14550086169754417, "wonOrders": 438, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.36, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 2

Source dispatcher 3cb7ba4 + parser 471f06d. Thử `emergencyMultiplier=1.7`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `w80caece9f03bdfd71f1d` · `{"marginCents": 383165, "revenueCents": 2638700, "marginShare": 0.14520976238299163, "wonOrders": 420, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w8f660cdf5c61cb45c1ee` · `{"marginCents": 383165, "revenueCents": 2638700, "marginShare": 0.14520976238299163, "wonOrders": 420, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.7, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w763cc4e7e5f65080a476` · `{"marginCents": 331708, "revenueCents": 2806300, "marginShare": 0.11820119017923957, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w29dd40fb78e30ea3aeeb` · `{"marginCents": 332537, "revenueCents": 2806300, "marginShare": 0.11849659694259346, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.7, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, pricing-three-holdout-d, `w958d9f087ed08e222113` · `{"marginCents": 413945, "revenueCents": 2763100, "marginShare": 0.14981180558068835, "wonOrders": 436, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, pricing-three-holdout-d, `wbe6057d3e76bf8e8f2a4` · `{"marginCents": 413945, "revenueCents": 2763100, "marginShare": 0.14981180558068835, "wonOrders": 436, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.7, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 3

Source dispatcher 3cb7ba4 + parser 471f06d. Thử `minLeadMinutes=150`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `wa8d585479926754c45d3` · `{"marginCents": 373381, "revenueCents": 2632300, "marginShare": 0.14184591421950385, "wonOrders": 419, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w33bb4999632a66bd817c` · `{"marginCents": 335336, "revenueCents": 2711200, "marginShare": 0.12368545293596932, "wonOrders": 430, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 150, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w7a1297db85f6761f6ab8` · `{"marginCents": 325504, "revenueCents": 2806300, "marginShare": 0.11599045005879628, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w724c7ed64f89029072d1` · `{"marginCents": 319150, "revenueCents": 2847200, "marginShare": 0.1120925821860073, "wonOrders": 446, "onTimeShare": 0.9932735426008968, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 150, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 1

Source dispatcher 3cb7ba4 + parser 471f06d. Thử `marginReserve=0.02`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: chọn ứng viên.

- baseline, full-check-a, `w4f85801a4f76905f9c13` · `{"marginCents": 347781, "revenueCents": 2632300, "marginShare": 0.1321205789613646, "wonOrders": 419, "onTimeShare": 0.9976133651551312, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w273a95f0e039b6504ff6` · `{"marginCents": 362666, "revenueCents": 2907300, "marginShare": 0.12474323255254016, "wonOrders": 447, "onTimeShare": 0.9932885906040269, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w931078fa3948b1b11932` · `{"marginCents": 321515, "revenueCents": 2792400, "marginShare": 0.11513930668958602, "wonOrders": 439, "onTimeShare": 0.9908883826879271, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w2ae9de686558b0b21722` · `{"marginCents": 345314, "revenueCents": 3093300, "marginShare": 0.11163288397504284, "wonOrders": 471, "onTimeShare": 0.9936305732484076, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, pricing-three-holdout-e, `w60c8d3a855690358d6c9` · `{"marginCents": 306950, "revenueCents": 2253200, "marginShare": 0.13622847505769572, "wonOrders": 375, "onTimeShare": 0.9893333333333333, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, pricing-three-holdout-e, `w02af39baf22629c0f5a6` · `{"marginCents": 313320, "revenueCents": 2549800, "marginShare": 0.1228802259000706, "wonOrders": 408, "onTimeShare": 0.9877450980392157, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 2

Source dispatcher 3cb7ba4 + parser 471f06d. Thử `capacityFraction=0.28`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `w44d320cca16708d2dc92` · `{"marginCents": 383165, "revenueCents": 2638700, "marginShare": 0.14520976238299163, "wonOrders": 420, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w8fed7611d6d81cb84171` · `{"marginCents": 383165, "revenueCents": 2638700, "marginShare": 0.14520976238299163, "wonOrders": 420, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w6898b0131e2e937059cb` · `{"marginCents": 331708, "revenueCents": 2806300, "marginShare": 0.11820119017923957, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `wa371d5d4b06e564aaaf1` · `{"marginCents": 331708, "revenueCents": 2806300, "marginShare": 0.11820119017923957, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.28, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 3

Source dispatcher 1bb6631 + parser 471f06d. Thử `emergencyMultiplier=1.85`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `we9a71caba4890fb451e6` · `{"marginCents": 373381, "revenueCents": 2632300, "marginShare": 0.14184591421950385, "wonOrders": 419, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `wecf22e181fab24039027` · `{"marginCents": 373381, "revenueCents": 2632300, "marginShare": 0.14184591421950385, "wonOrders": 419, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.85, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w03ac47fd99b0750b8a48` · `{"marginCents": 325504, "revenueCents": 2806300, "marginShare": 0.11599045005879628, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `wfcc73e9d880c20d62dca` · `{"marginCents": 327661, "revenueCents": 2806300, "marginShare": 0.11675907778925988, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.85, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, pricing-three-holdout-e, `w98cafe6ff5f8aa1ab372` · `{"marginCents": 329735, "revenueCents": 2263500, "marginShare": 0.14567483984979016, "wonOrders": 375, "onTimeShare": 0.9946666666666667, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, pricing-three-holdout-e, `wf46c4550f66d7d8f26a9` · `{"marginCents": 329735, "revenueCents": 2263500, "marginShare": 0.14567483984979016, "wonOrders": 375, "onTimeShare": 0.9946666666666667, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.85, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 1

Source dispatcher b937115 + parser 471f06d. Thử `minLeadMinutes=90`. Chọn khi margin tăng và mọi tuần vượt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `w727b10c9c39c2e1fdcb5` · `{"marginCents": 362666, "revenueCents": 2907300, "marginShare": 0.12474323255254016, "wonOrders": 447, "onTimeShare": 0.9932885906040269, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w42e901c3dbca43e78d1a` · `{"marginCents": 289618, "revenueCents": 3041100, "marginShare": 0.0952346190523166, "wonOrders": 464, "onTimeShare": 0.9913793103448276, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 90, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w6959269149527751886a` · `{"marginCents": 345314, "revenueCents": 3093300, "marginShare": 0.11163288397504284, "wonOrders": 471, "onTimeShare": 0.9936305732484076, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w4ddfa5f910c1126be2ef` · `{"marginCents": 262459, "revenueCents": 3230100, "marginShare": 0.08125414073867682, "wonOrders": 487, "onTimeShare": 0.9897330595482546, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 90, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 2

Source dispatcher e225852 + parser 471f06d. Thử `marginReserve=0.02`. Chọn khi margin tăng và mọi tuần vượt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `w6fff3954aad166d12cb2` · `{"marginCents": 383165, "revenueCents": 2638700, "marginShare": 0.14520976238299163, "wonOrders": 420, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w706583f029a24aeb6d81` · `{"marginCents": 342985, "revenueCents": 2913700, "marginShare": 0.1177145896969489, "wonOrders": 448, "onTimeShare": 0.9955357142857143, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w33b38ebb91ea4fe9e26f` · `{"marginCents": 331708, "revenueCents": 2806300, "marginShare": 0.11820119017923957, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w13cbd9f6912fb1f4b550` · `{"marginCents": 352314, "revenueCents": 3118900, "marginShare": 0.1129609798326333, "wonOrders": 473, "onTimeShare": 0.9915433403805497, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 3

Source dispatcher e225852 + parser 471f06d. Thử `marginReserve=0.02`. Chọn khi margin tăng và mọi tuần vượt 90%, kiểm tra thêm trên seed mới. Kết luận: chọn ứng viên.

- baseline, full-check-a, `w63d2de0c6b220506f71f` · `{"marginCents": 373381, "revenueCents": 2632300, "marginShare": 0.14184591421950385, "wonOrders": 419, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w330db07df30381e7ddf4` · `{"marginCents": 371684, "revenueCents": 2907300, "marginShare": 0.12784507962714547, "wonOrders": 447, "onTimeShare": 0.9932885906040269, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `w7b28265e967af90b40ea` · `{"marginCents": 325504, "revenueCents": 2806300, "marginShare": 0.11599045005879628, "wonOrders": 440, "onTimeShare": 0.9886363636363636, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w693adf09e0ddb72f3bbc` · `{"marginCents": 364611, "revenueCents": 3080200, "marginShare": 0.1183725082786832, "wonOrders": 470, "onTimeShare": 0.9936170212765958, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, pricing-margin-holdout-f, `w3e6ab17b4f52251225e9` · `{"marginCents": 359924, "revenueCents": 2337800, "marginShare": 0.1539584224484558, "wonOrders": 412, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, pricing-margin-holdout-f, `wc8f30cca91e73de09bdc` · `{"marginCents": 369718, "revenueCents": 2524900, "marginShare": 0.14642876945621608, "wonOrders": 433, "onTimeShare": 0.9930715935334873, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 1

Source tích hợp `2213766b83900ad7aa289437d37dd055a938dbc4`. Driver fees were 87.6% of revenue; screen out distant driver supply. A 1% fee reduction at unchanged volume would save €263/week. Thử `maxApproachMinutes=80`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `wda60bab59d9bb3ae357e` · `{"marginCents": 361572, "revenueCents": 2942000, "marginShare": 0.12290006798096532, "wonOrders": 452, "onTimeShare": 0.9933628318584071, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `w65a8b03bd656dc2d86ca` · `{"marginCents": 363703, "revenueCents": 2935900, "marginShare": 0.12388126298579652, "wonOrders": 451, "onTimeShare": 0.9933481152993349, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 80, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `wc16dfa140238f9b534cb` · `{"marginCents": 323353, "revenueCents": 3115300, "marginShare": 0.1037951401149167, "wonOrders": 475, "onTimeShare": 0.9936842105263158, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w0606310d597880c992f2` · `{"marginCents": 312462, "revenueCents": 2958700, "marginShare": 0.10560786832054618, "wonOrders": 458, "onTimeShare": 0.9912663755458515, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 2.1, "marginReserve": 0.02, "minMarginCents": 200, "capacityFraction": 0.26, "maxApproachMinutes": 80, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`

### Practice pricing vòng level 2

Source tích hợp `2213766b83900ad7aa289437d37dd055a938dbc4`. Driver fees were 86.5% of revenue; more booking slack may screen expensive urgent orders. A 1% fee reduction at unchanged volume would save €235/week. Thử `minLeadMinutes=270`. Chọn khi margin tăng và mọi tuần đạt 90%, kiểm tra thêm trên seed mới. Kết luận: giữ baseline.

- baseline, full-check-a, `wa365aba482492d188034` · `{"marginCents": 383506, "revenueCents": 2663600, "marginShare": 0.14398032737648295, "wonOrders": 424, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-a, `wb337e0249947f219f9e2` · `{"marginCents": 378938, "revenueCents": 2527800, "marginShare": 0.14990822058707176, "wonOrders": 404, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 270, "strictNotes": true, "offers": true}`
- baseline, full-check-b, `we660ac96e51b1bff7545` · `{"marginCents": 318349, "revenueCents": 2828300, "marginShare": 0.1125584273238341, "wonOrders": 444, "onTimeShare": 0.9887387387387387, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, full-check-b, `w290874841eb37aae8aa1` · `{"marginCents": 353837, "revenueCents": 2739900, "marginShare": 0.12914230446366656, "wonOrders": 429, "onTimeShare": 0.993006993006993, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 270, "strictNotes": true, "offers": true}`
- baseline, pricing-route-holdout-g, `w3e22896a30776c63f3b6` · `{"marginCents": 378132, "revenueCents": 2534500, "marginShare": 0.14919392385085817, "wonOrders": 425, "onTimeShare": 1, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 210, "strictNotes": true, "offers": true}`
- candidate, pricing-route-holdout-g, `w927311e9c83d185452a9` · `{"marginCents": 373219, "revenueCents": 2452200, "marginShare": 0.15219761846505178, "wonOrders": 413, "onTimeShare": 0.9951573849878934, "undeliveredShare": 0, "ranked": true}` · refusals 0 · config `{"quoteMultiplier": 1.4, "feeMultiplier": 1.2, "emergencyMultiplier": 1.9, "marginReserve": 0.045, "minMarginCents": 200, "capacityFraction": 0.32, "maxApproachMinutes": 100, "minLeadMinutes": 270, "strictNotes": true, "offers": true}`
