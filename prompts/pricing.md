Bạn đang làm song song với hai người khác trên challenge Spread của Bahn.

Repo private: https://github.com/lilso-andy/spread-dispatcher
Vai trò của bạn: pricing, chọn cấu hình và đánh giá thực nghiệm.

Trước khi sửa code, đọc AGENTS.md, README.md, TEAM.md, STATUS.md, docs/BENCHMARKS.md và docs/RULES.md. RULES.md là nguồn đúng khi tài liệu mâu thuẫn. Kiểm tra git status, giữ nguyên thay đổi của người khác. Fetch origin và tạo branch riêng từ origin/main tên work/pricing-baotran1604; nếu đã tồn tại thì tiếp tục branch đó. Không làm trực tiếp trên main.

Mục tiêu: tăng gross margin nhưng mọi tuần kiểm chứng phải có ít nhất 90% đơn thắng giao đúng hạn; hướng tới mức dự phòng >=95%. Đừng chọn chính sách chỉ vì tổng margin cao khi có seed không đủ điều kiện ranked.

Phạm vi sở hữu:
- configs/: thêm cấu hình mới với tên riêng; không sửa cấu hình đã benchmark mà không đổi tên.
- evaluate.ts và các script phân tích mới trong analysis/.
- File báo cáo docs/PRICING_RESULTS.md của riêng bạn.
- Không sửa desk.ts, planner.ts, runner.ts hoặc notes.ts; nếu cần đổi thuật toán ở đó, ghi đề xuất và bằng chứng cụ thể trong PR để người phụ trách ghép. Không sửa STATUS.md/BENCHMARKS.md chung trong lúc người khác đang ghi, hãy dùng báo cáo riêng.

Việc cần làm:
1. Xác nhận Node >=22.18, ưu tiên Node 24. Project không cần cài dependencies. Chạy node --test test/*.test.ts.
2. Kiểm tra .env chỉ bằng cách kiểm tra có tồn tại/biến có được đặt không. Không in nội dung hay key. Nếu chưa có SPREAD_KEY, hỏi chủ team cấp riêng và tiếp tục phân tích offline.
3. Chạy lại balanced và conservative trên cùng level 8 và cùng seed để xác nhận baseline ở phiên bản main hiện tại. Chỉ dùng practice; tối đa 1–2 world đồng thời vì cả đội chung giới hạn 8 slot và API quota. Chỉ tiếp tục world do bạn sở hữu và chỉ khi không có bot khác điều khiển nó.
4. Phân tích quote thắng/thua, reference fee, lane, dealer trust, thời gian đặt gig, khoản phạt và late refunds. Thử một số giả thuyết có lý do về quoteMultiplier, feeMultiplier, minMarginCents, marginReserve, capacityFraction và minLeadMinutes. Không tìm kiếm cấu hình mù hàng trăm lượt.
5. So sánh các phương án trên spread-1, study-2, holdout-3, rồi kiểm chứng ứng viên tốt nhất trên ít nhất 2 seed mới chưa dùng để tune. Reveal chỉ dùng để phân tích sau khi tuần kết thúc, không dùng hidden truth làm đầu vào dispatcher đang chơi.
6. Báo cáo từng seed: config đầy đủ, commit code, worldId, marginCents, wonOrders, onTimeShare, undeliveredShare, ranked, action refusals. Ghi cả những lượt thất bại. Đưa ra đề xuất dựa trên tỷ lệ ranked, worst on-time share và margin; tách rõ giả thuyết và điều đã kiểm chứng.
7. Commit đúng các file thuộc phần mình, push branch và mở PR vào main. Không tự merge. Nếu thiếu quyền mở PR thì cung cấp link compare và nội dung PR sẵn dùng. Kết thúc bằng kết quả chính, giới hạn và link PR.

Lệnh bắt đầu tham khảo:
node --env-file=.env evaluate.ts --config configs/balanced.json --seeds spread-1,study-2,holdout-3 --output runs/pricing-baseline --reveal

Không commit .env, team key, raw logs trong runs/ hoặc thay đổi ngoài phạm vi. Không dùng --board, không chạy --final, không xóa world của người khác. Chỉ một máy chính của team được điều khiển final.
