# Pricing baotran1604

## Bằng chứng hiện có

- Mốc so sánh mới là `5f33186967c13fc4d86564c2877490ef3a8e26ce`. Node 24.22.3 chạy đạt 13/13 test offline.
- Benchmark balanced ở revision `2a37b7f` đạt €8.647,13 và 3/3 seed đủ điều kiện xếp hạng, với mức thấp nhất 93,63% ở study-2. Conservative trong benchmark cũ được chạy ở revision khác, nên cần chạy lại cả hai trên cùng code.
- Chưa có SPREAD_KEY tại thời điểm chuẩn bị. Chưa tạo world practice và chưa có kết quả theo seed cho revision mới.

## Giả thuyết

- `configs/pricing-baotran1604-fee.json` chỉ nâng feeMultiplier từ 1,20 lên 1,25 so với balanced. Mức sàn phí cao hơn có thể giúp đặt gig sớm và giảm hoàn tiền do trễ. Thay đổi này cũng nâng ước tính chi phí dùng để tính giá tối thiểu, nên cần đo cả tỷ lệ thắng lẫn phí tài xế.
- Nếu phí cao hơn vẫn để nhiều gig được đặt sát lastPickupAt, thử riêng minLeadMinutes 210 hoặc capacityFraction 0,18 để đo tác động lên đúng hạn và số đơn. Mỗi lần đổi một tham số.
- Nếu đơn đặt sớm vẫn có margin thấp, đo độ nhạy với quoteMultiplier 1,45. Với nhóm quote bị chi phối bởi giá sàn, thử riêng minMarginCents 3000 hoặc marginReserve 0,18. Tách theo lane, tỷ lệ giá chào/list price, reference fee và trust của dealer trước khi so sánh tỷ lệ thắng.

## Kiểm chứng practice

Chạy tuần tự balanced, conservative và ứng viên trên spread-1, study-2, holdout-3 ở level 8. Sau khi chọn ứng viên, so với baseline trên hai seed mới `pricing-baotran1604-check-1` và `pricing-baotran1604-check-2`.

```sh
for policy in balanced conservative pricing-baotran1604-fee; do
  node --env-file=.env evaluate.ts --level 8 --config "configs/${policy}.json" \
    --seeds spread-1,study-2,holdout-3 --output "runs/pricing-${policy}" --reveal
  result=$?
  if [ "$result" -ne 0 ] && [ "$result" -ne 2 ]; then break; fi
done
```

Dùng reveal sau khi tuần kết thúc. Đếm quote thắng/thua trong nhóm quote thương mại và báo riêng các lượt chủ động từ chối. Ghép request, order và gig để xem lane, reference fee, thời gian từ post đến booking và khoảng đệm đến lastPickupAt. Dùng ledger để đối chiếu phí tài xế, late refund, failed visit, release và penalty. So sánh theo nhóm trust trước quote để tránh gộp hiệu ứng giá và lịch sử giao hàng.

Mỗi tuần ghi seed, level, commit, config đầy đủ, worldId, marginCents, wonOrders, onTimeShare, undeliveredShare, ranked và action refusals. Ghi mọi tuần dưới 90% hoặc không đủ điều kiện. Ưu tiên mọi seed đạt tối thiểu 90%, hướng tới mức thấp nhất 95%, rồi so margin trên cùng tập seed. Chưa có đề xuất đổi cấu hình mặc định.
