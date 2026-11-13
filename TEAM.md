# Làm chung bằng Codex + GitHub

Repo: https://github.com/lilso-andy/spread-dispatcher

## Mỗi người thiết lập một lần

Chấp nhận lời mời GitHub trước, sau đó:

```powershell
git clone https://github.com/lilso-andy/spread-dispatcher.git
cd spread-dispatcher
node setup-env.ts
```

Điền team key vào `.env` trên chính máy mình. Không đưa key vào Git hay prompt chia sẻ. Cài Node >= 22.18 (khuyên dùng Node 24). Không cần cài package.

`.env` không nằm trên GitHub là đúng thiết kế; repo có `.env.example`. Mỗi máy hoặc workspace mới tự chạy `node setup-env.ts`, điền key riêng rồi chạy `node setup-env.ts --check`. Lệnh setup không ghi đè file đã có; lệnh check không in key. Nếu task đã được cấp `SPREAD_KEY` qua biến môi trường thì không bắt buộc có file `.env`; chạy bằng `node --env-file-if-exists=.env dispatch.ts ...`. Key phải được chuyển qua kênh riêng và không được commit.

Mở thư mục repo bằng Codex. Bảo Codex: “Đọc AGENTS.md, README.md, STATUS.md và TEAM.md. Làm phần việc của tôi trên branch riêng; chạy test trước khi push.”

Prompt chi tiết để copy vào Codex: [pricing](prompts/pricing.md) cho baotran1604, [notes và tests](prompts/notes-tests.md) cho thanhdatLUT. Hai prompt chia file sở hữu để hạn chế xung đột.

## Chia việc đề xuất cho ba người

| Người | Branch | Phần việc |
| --- | --- | --- |
| lilso-andy | `work/dispatcher` | desk.ts, planner.ts, runner.ts: điều phối, khả năng giao đúng hạn |
| baotran1604 | `work/pricing` | config thử nghiệm, phân tích win/loss và gross margin |
| thanhdatLUT | `work/notes-tests` | notes.ts, test/: note FI/SV/EN và trường hợp lỗi |

Đây là đề xuất; trao đổi trước khi hai người sửa cùng file. Mỗi thay đổi ghi mục tiêu và seed kiểm chứng trong PR. Thêm test có ý nghĩa khi sửa logic.

## Mỗi lần bắt đầu làm

```powershell
git switch main
git pull --ff-only origin main
git switch -c work/pricing-v1
```

Nếu branch đã tồn tại thì dùng `git switch work/pricing-v1` và `git merge origin/main`. Giữ hoặc commit thay đổi đang làm trước khi chuyển branch.

## Chạy kiểm tra và chia sẻ code

```powershell
node --test test/*.test.ts
node --env-file=.env dispatch.ts --seed pricing-v1 --level 8 --reveal
git add configs TEAM.md
git commit -m "Tune pricing with practice evidence"
git push -u origin work/pricing-v1
```

Thay danh sách file trong `git add` bằng file mình đã sửa. Mở pull request vào `main`; một người review, chạy test rồi merge. Hai máy còn lại `git pull` để nhận code. Git đồng bộ khi push/pull; không tự đồng bộ từng phím gõ. Muốn thấy nhau gõ trực tiếp, có thể dùng thêm VS Code Live Share, nhưng vẫn chia branch nếu hai Codex cùng sửa code.

## Chia sẻ ngữ cảnh và kết quả

- Mỗi máy có chat Codex riêng. Ghi quyết định, giả thuyết, kết quả đã xác nhận và việc còn thiếu trong `STATUS.md` hoặc PR.
- `runs/` chứa log, reveal và score trên từng máy, mặc định không commit. Đưa bảng kết quả tóm tắt vào `docs/BENCHMARKS.md`; ghi rõ config, seed, margin và on-time share.
- Nếu cần chia sẻ log đầy đủ, kiểm tra nội dung rồi chuyển riêng; không commit `.env`.
- Cùng seed + level + code + config tạo cùng lượt practice. Dùng cùng tập seed khi so sánh hai phương án.

## Tránh hai bot điều khiển một world

- Mỗi máy tạo practice world riêng bằng `--seed`; không dùng chung `--world` khi máy khác đang chạy nó.
- Cả đội chia sẻ giới hạn API và tối đa 8 practice world chưa kết thúc. Mỗi người nên chạy 1–2 world đồng thời.
- Ranking chỉ có 5 lượt/round/level: thống nhất trước khi dùng `--board`.
- Final: chỉ **một máy chính** chạy `--final`. Hai máy còn lại phân tích/review. Máy dự phòng chỉ chạy khi máy chính đã dừng; bot sẽ đọc lại snapshot và events.
- Không xóa world của người khác. World practice đang dở có thể tiếp tục bằng `--world ID`; world đã kết thúc không chiếm slot.
