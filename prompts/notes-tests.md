Bạn đang làm song song với hai người khác trên challenge Spread của Bahn.

Repo private: https://github.com/lilso-andy/spread-dispatcher
Vai trò của bạn: đọc note FI/SV/EN chính xác và kiểm tra các trường hợp biên.

Trước khi sửa code, đọc AGENTS.md, README.md, TEAM.md, STATUS.md, docs/BENCHMARKS.md và docs/RULES.md. RULES.md là nguồn đúng khi tài liệu mâu thuẫn. Kiểm tra git status và giữ nguyên thay đổi của người khác. Fetch origin và tạo branch riêng từ origin/main tên work/notes-thanhdatLUT; nếu đã tồn tại thì tiếp tục branch đó. Không làm trực tiếp trên main.

Mục tiêu: giảm các đơn bị từ chối vì note chưa hiểu, nhưng không nhận thêm các đơn có ràng buộc bị bỏ sót. Hạn giao >=90% là bắt buộc; parser phải biểu diễn sự không chắc chắn thay vì đoán im lặng.

Phạm vi sở hữu:
- notes.ts; giữ tương thích với kiểu NoteFacts và readNote hiện tại.
- File test riêng mới: test/notes.test.ts, và fixtures note đã loại thông tin bí mật nếu cần.
- File báo cáo docs/NOTES_RESULTS.md của riêng bạn.
- Không sửa desk.ts, planner.ts, runner.ts, config.ts, configs/ hay evaluate.ts. Nếu cần thay đổi kiểu/interface, đề xuất trong PR kèm ví dụ để người phụ trách điều phối ghép.

Việc cần làm:
1. Xác nhận Node >=22.18, ưu tiên Node 24, và chạy node --test test/*.test.ts trước khi sửa.
2. Rà soát parser hiện tại theo quy tắc về ngày tương đối, tên thứ, giờ bằng chữ, half/puoli/halv, AM/PM, câu phủ định, tự đính chính, nhiều ràng buộc trong cùng note, giờ mở cửa lặp lại, manual licence, transfer plates và summer tyres.
3. Thêm test hành vi cho các lỗi thực tế, bắt đầu bằng những câu có nhiều sự kiện/time khác nhau, giờ bị phủ định, và câu sửa lại giờ cũ. Test phải kiểm tra ý nghĩa mong muốn theo rules, không chép lại cách implementation đang hoạt động.
4. Có thể dùng practice level 8 và reveal để tìm lỗi/đo coverage. .env giữ riêng trên máy, không in key. Nếu chưa có key, tiếp tục bằng ví dụ từ handbook/rules và hỏi chủ team cấp riêng. Tối đa 1–2 practice world đồng thời; không điều khiển world đang thuộc bot khác. Không dùng reveal làm hidden input cho lượt chơi đang chạy.
5. Phân biệt note vô hại, note hiểu đầy đủ và note còn mơ hồ. Tránh để việc nhận ra một từ như manual khiến parser bỏ qua một ràng buộc thời gian chưa hiểu ở câu khác. Không nhận nhầm số điện thoại, mã hộp khóa hay thông số xe thành giờ.
6. Chạy toàn bộ tests. Kiểm chứng trên một tập note độc lập và, nếu có key, ít nhất 2 practice seed với cùng config trước/sau. Ghi rõ coverage, số false-safe (tưởng hiểu đủ nhưng bỏ sót ràng buộc), false-uncertain, các ví dụ còn lỗi và ảnh hưởng đến ranked/margin. Không tuyên bố parser hiểu mọi note.
7. Commit đúng file thuộc phần mình, push branch và mở PR vào main. Không tự merge. Nếu thiếu quyền mở PR thì cung cấp link compare và nội dung PR sẵn dùng. Kết thúc bằng thay đổi, tests, giới hạn và link PR.

Không commit .env, team key, raw logs trong runs/ hay sửa file ngoài phạm vi. Không dùng --board, không chạy --final, không xóa world của người khác. Chỉ một máy chính của team được điều khiển final.
