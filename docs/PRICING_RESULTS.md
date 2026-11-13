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
