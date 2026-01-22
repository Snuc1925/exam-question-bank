# Trực quan hóa dữ liệu văn bản (Text Data Visualization)

**Trường:** Đại học Bách Khoa Hà Nội (HUST)  
**Khoa:** Công nghệ Thông tin và Truyền thông

---

## 1. Mục tiêu trực quan hóa văn bản

### 1.1 Hiểu (Understanding)
- **Mục đích:** Nắm bắt "ý chính" của một tài liệu
- **Ví dụ:** Đọc một bài báo dài và muốn hiểu nhanh nội dung chính nói về gì

### 1.2 Nhóm (Grouping)
- **Mục đích:** Phân cụm để có cái nhìn tổng quan hoặc phân loại
- **Ví dụ:** Nhóm 1000 bài báo thành các chủ đề:  thể thao, chính trị, kinh tế

### 1.3 So sánh (Comparison)
- **Mục đích:** So sánh các bộ sưu tập tài liệu hoặc xem sự phát triển theo thời gian
- **Ví dụ:** So sánh cách Obama và Clinton nói về cải cách y tế

### 1.4 Tương quan (Correlation)
- **Mục đích:** So sánh mẫu trong văn bản với dữ liệu khác
- **Ví dụ:** Tương quan nội dung tweet với mạng xã hội của người đăng

---

## 2. Văn bản như dữ liệu

### 2.1 Tài liệu đơn lẻ (Documents)
- Bài báo, sách, tiểu thuyết
- Email, trang web, blog
- Tag, bình luận
- Chương trình máy tính, log files

### 2.2 Bộ sưu tập tài liệu (Collections)
- Tin nhắn (email, blog, tag, bình luận)
- Mạng xã hội (hồ sơ cá nhân)
- Cộng tác học thuật (xuất bản)

---

## 3. Ví dụ thực tế:  Cải cách Y tế Hoa Kỳ

### 3.1 Bối cảnh
- **Lịch sử:** 
  - Sáng kiến của Tổng thống Clinton (1993)
  - Cải cách của Tổng thống Obama (2009)

### 3.2 Dữ liệu văn bản
- Bài báo tin tức
- Bản ghi bài phát biểu
- Tài liệu pháp lý

### 3.3 Câu hỏi cần trả lời
- Hai tổng thống nói về vấn đề này khác nhau như thế nào?
- Từ nào được sử dụng nhiều nhất?
- Trọng tâm của mỗi người là gì?

---

## 4. Tag Clouds (Đám mây từ)

### 4.1 Khái niệm
- **Định nghĩa:** Hiển thị từ với kích thước tỷ lệ thuận với tần suất xuất hiện
- **Nguyên lý:** Từ xuất hiện nhiều → chữ to; từ ít → chữ nhỏ

### 4.2 Ví dụ cụ thể
**So sánh bài phát biểu về Y tế:**
- **Obama 2009:** Từ nổi bật:  "insurance", "care", "health", "reform"
- **Clinton 1993:** Từ nổi bật: "health", "care", "system", "coverage"

### 4.3 Nhận xét
- Cho thấy trọng tâm khác nhau
- Obama tập trung vào "bảo hiểm" (insurance)
- Clinton tập trung vào "hệ thống" (system)

---

## 5. Khoảng cách đánh giá (Gulfs of Evaluation)

### 5.1 Vấn đề cốt lõi
⚠️ **Nhiều trực quan hóa văn bản KHÔNG thể hiện trực tiếp văn bản**

Chúng thể hiện **kết quả của mô hình ngôn ngữ:**
- Đếm từ (word counts)
- Chuỗi từ (word sequences)
- Các mô hình thống kê khác

### 5.2 Câu hỏi cần đặt ra
1. **Bạn có hiểu được trực quan hóa không?**
   - Ví dụ: Tag cloud có thực sự phản ánh nội dung? 

2. **Nó truyền tải tốt các thuộc tính của mô hình không?**
   - Mô hình đếm từ có bỏ sót ngữ cảnh không?

3. **Bạn có tin tưởng mô hình không?**
   - Mô hình này có độ chính xác bao nhiêu?

4. **Mô hình giúp chúng ta suy luận về văn bản như thế nào?**
   - Chúng ta có thể kết luận gì từ mô hình?

---

## 6. Thách thức khi trực quan hóa văn bản

### 6.1 Chiều cao (High Dimensionality)
**Vấn đề:** 
- Một tài liệu có thể có hàng nghìn từ khác nhau
- Mỗi từ là một chiều (dimension)

**Giải pháp:**
- Sử dụng văn bản để biểu diễn văn bản
- Chọn từ nào mô tả nhất? 

### 6.2 Ngữ cảnh & Ngữ nghĩa (Context & Semantics)
**Vấn đề:**
- Từ có nhiều nghĩa tùy ngữ cảnh
- "Bank" = ngân hàng hay bờ sông? 

**Giải pháp:**
- Cung cấp ngữ cảnh liên quan
- Hiển thị (hoặc cho phép truy cập) văn bản gốc

### 6.3 Trừu tượng hóa mô hình (Modeling Abstraction)
**Cần làm:**
1.  Xác định nhiệm vụ phân tích của bạn
2. Hiểu sự trừu tượng của mô hình ngôn ngữ
3. Khớp nhiệm vụ với công cụ và mô hình phù hợp

---

## 7. Xử lý văn bản cơ bản (Text Processing Pipeline)

### 7.1 Tokenization (Phân đoạn)
**Mục đích:** Chia văn bản thành các từ (terms)

**Quyết định cần đưa ra:**

1. **Loại bỏ stop words? **
   - Stop words: a, an, the, of, to, be
   - Ưu:  Giảm nhiễu
   - Nhược: Có thể mất thông tin

2. **Xử lý số và ký hiệu? **
   - #gocard, @stanfordfball, Beat Cal!! !!! !!! 
   - Giữ lại hay loại bỏ? 

3. **Nhận dạng thực thể?**
   - San Francisco, O'Connor, U.S.A.
   - Coi như một từ hay tách ra?

### 7.2 Stemming (Rút gọn từ)
**Mục đích:** Nhóm các dạng khác nhau của cùng một từ

**Ví dụ với Porter Stemmer:**
- visualization, visualizations, visualize, visually → **visual**

**Lemmatization (phức tạp hơn):**
- goes, went, gone → **go**

**Kết quả:** Danh sách các từ đã xử lý (ordered list of terms)

---

## 8. Mô hình Túi từ (Bag of Words Model)

### 8.1 Nguyên tắc
- **Bỏ qua** thứ tự của từ trong văn bản
- Một tài liệu ≈ vector trọng số từ

### 8.2 Cấu trúc
- **Mỗi chiều:** Tương ứng với một từ (10,000+ chiều)
- **Mỗi giá trị:** Biểu thị mức độ liên quan
- **Ví dụ đơn giản:** Đếm số lần xuất hiện

### 8.3 Document-Term Matrix (Ma trận Tài liệu-Từ)

```
                    Antony &   Julius  The      Hamlet  Othello  Macbeth
                    Cleopatra  Caesar   Tempest
Antony              157        73       0        0       0        0
Brutus              4          157      0        1       0        0
Caesar              232        227      0        2       1        1
Calpurnia           0          10       0        0       0        0
Cleopatra           57         0        0        0       0        0
mercy               2          0        3        5       5        1
worser              2          0        1        1       1        0
```

**Giải thích:**
- Mỗi cột = một tài liệu (vở kịch Shakespeare)
- Mỗi hàng = một từ
- Giá trị = số lần từ xuất hiện trong tài liệu

---

## 9. Word Embeddings (Nhúng từ)

### 9.1 Khái niệm
Từ có **ý nghĩa và quan hệ** với nhau: 

1. **Tương quan:**
   - Hong Kong, San Francisco, Bay Area

2. **Thứ tự:**
   - April, February, January, June, March, May

3. **Thành viên nhóm:**
   - Tennis, Running, Swimming, Hiking, Piano

4. **Khác:**
   - Phân cấp, trái nghĩa, đồng nghĩa, thực thể... 

### 9.2 Ý nghĩa
- Biểu diễn từ trong không gian vector
- Từ có nghĩa gần nhau → gần nhau trong không gian
- Cho phép tính toán:  King - Man + Woman ≈ Queen

---

## 10. Các kỹ thuật trực quan hóa từ

### 10.1 Word Count (Đếm từ)
- **Đặc điểm:** Liệt kê từ theo tần suất
- **Ví dụ:** wordcount. org
- **Ưu:** Đơn giản, chính xác
- **Nhược:** Khô khan, nhiều dữ liệu

### 10.2 Word Cloud (Đám mây từ)
- **Đặc điểm:** Kích thước từ ∝ tần suất
- **Ưu:** Trực quan, bắt mắt
- **Nhược:** Không chính xác, khó so sánh

### 10.3 N-gram Cloud
- **N-gram:** Chuỗi n từ liên tiếp
- **Ví dụ:** "health care", "insurance coverage"
- **Ưu:** Giữ được ngữ cảnh hơn word cloud

### 10.4 WordTree (Cây từ)
**Tác giả:** Wattenberg & Viégas (2008)

**Cấu trúc:**
- Chọn một từ gốc
- Hiển thị cây các từ theo sau (hoặc đứng trước)
- Độ dày nhánh ∝ tần suất

**Ứng dụng:**
- Xem ngữ cảnh của từ
- Khám phá cụm từ phổ biến

### 10.5 PhraseNet (Mạng cụm từ)
**Đặc điểm:**
- Hiển thị mối quan hệ giữa các từ
- Dựa trên các mẫu cụm từ (X and Y, X is Y)

**Ví dụ:**
- "Romeo and Juliet"
- "love is blind"

### 10.6 Arc Diagram (Sơ đồ vòng cung)
**Đặc điểm:**
- Hiển thị mối liên kết giữa các từ trong văn bản
- Vòng cung nối các lần xuất hiện của cùng một từ
- Cho thấy cấu trúc và sự lặp lại

---

## 11. Trực quan hóa chủ đề tài liệu (Topic Visualization)

### 11.1 Vấn đề
- **Số lượng lớn:** Hàng nghìn tài liệu
- **Cần:** Trực quan hóa các chủ đề chung

### 11.2 Phương pháp

#### A. Static (Tĩnh)
- ContentTour
- IN-SPIRE

#### B. Dynamic (Động)
- **ThemeRiver**
- **RoseRiver**

#### C. Hidden (Ẩn)
- **Termite**

---

## 12. ThemeRiver (Dòng sông chủ đề)

### 12.1 Cấu trúc
- **Trục ngang:** Thời gian
- **Trục dọc:** Số lượng tài liệu
- **Dòng chảy:** Mỗi chủ đề là một dòng sông
- **Độ rộng:** Tỷ lệ thuận với số lượng tài liệu về chủ đề đó

### 12.2 Ứng dụng
- Theo dõi sự phát triển của chủ đề theo thời gian
- Phát hiện sự kiện quan trọng (dòng sông phình to đột ngột)
- So sánh nhiều chủ đề cùng lúc

---

## 13. Termite:  Trực quan hóa mô hình chủ đề

### 13.1 Mục đích
- Tổng quan về các chủ đề
- Xem từ trong một chủ đề
- Xác định chủ đề không hữu ích
- So sánh các chủ đề

### 13.2 Lọc từ trong chủ đề

**Vấn đề:** Từ xuất hiện nhiều ≠ từ hữu ích

**Giải pháp - Saliency (Độ nổi bật):**
```
saliency(w) = frequency(w) × distinctiveness(w)
```

**Giải thích:**
- **Frequency:** Tần suất xuất hiện
- **Distinctiveness:** Tính đặc trưng (từ này chỉ xuất hiện trong chủ đề này)
- **Từ tốt:** Vừa xuất hiện nhiều, vừa đặc trưng

**Ví dụ:**
- Từ "the" → tần suất cao NHƯNG distinctiveness thấp → saliency thấp ❌
- Từ "covid" trong chủ đề y tế → tần suất cao VÀ distinctiveness cao → saliency cao ✓

### 13.3 Sắp xếp từ trong chủ đề

**3 phương pháp:**

1. **Cluster từ liên quan**
   - Nhóm các từ có nghĩa gần nhau

2. **Giữ thứ tự xuất hiện trong tài liệu**
   - Phản ánh cấu trúc tự nhiên

3. **Dựa trên độ tương đồng giữa các từ**
   - Sử dụng word embeddings

---

## 14.  Latent Topics (Chủ đề tiềm ẩn)

### 14.1 Khái niệm
- **Ý tưởng:** Mỗi tài liệu là hỗn hợp của nhiều chủ đề
- **Ví dụ:** 
  - Tài liệu 1: 70% chính trị + 30% kinh tế
  - Tài liệu 2: 20% chính trị + 80% thể thao

### 14.2 Topic Modeling
**Phương pháp phổ biến:**
- **LDA (Latent Dirichlet Allocation)**
- **LSA (Latent Semantic Analysis)**

**Cách hoạt động:**
1. Phân tích toàn bộ corpus (bộ sưu tập tài liệu)
2. Tìm ra các nhóm từ thường xuất hiện cùng nhau
3. Mỗi nhóm = một chủ đề tiềm ẩn

---

## 15. Các kỹ thuật trực quan hóa khác

### 15.1 StoryFlow:  Theo dõi sự phát triển của câu chuyện

**Mục đích:** 
- Trực quan hóa tương tác giữa các nhân vật theo thời gian
- Ứng dụng:  Phân tích tiểu thuyết, phim, series

**Ví dụ:**
- **Lord of the Rings:** Theo dõi hành trình của các nhân vật
- **XKCD:** Các bộ phim được vẽ thủ công

**Đặc điểm:**
- Trục ngang: Thời gian
- Mỗi dòng: Một nhân vật
- Dòng gần nhau: Nhân vật tương tác
- Dòng xa nhau: Nhân vật ở vị trí khác

### 15.2 EmotionWatch: Trực quan hóa cảm xúc

**Nguồn:** Kempter et al. (2014)

**Mục đích:** 
- Trực quan hóa cảm xúc chi tiết trong tweet liên quan đến sự kiện

**Đặc điểm:**
- Phân loại cảm xúc:  vui, buồn, giận, sợ, ngạc nhiên... 
- Theo dõi thay đổi cảm xúc theo thời gian
- Liên kết với sự kiện cụ thể

**Ứng dụng:**
- Phân tích phản ứng công chúng về sự kiện
- Nghiên cứu mạng xã hội
- Quản lý khủng hoảng

### 15.3 Document Card:  Thẻ tài liệu

**Nguồn:** Strobelt et al. (2009)

**Ý tưởng:** 
- Như trò chơi "Top Trumps" nhưng cho tài liệu
- Mỗi tài liệu = một thẻ với các thuộc tính

**Thuộc tính có thể hiển thị:**
- Độ dài
- Số từ khóa quan trọng
- Chủ đề chính
- Tác giả
- Năm xuất bản
- Độ phức tạp

**Ứng dụng:**
- So sánh nhanh nhiều tài liệu
- Khám phá bộ sưu tập tài liệu
- Tìm tài liệu tương tự

---

## 16. Tóm tắt & So sánh các kỹ thuật

| Kỹ thuật | Mục đích chính | Ưu điểm | Nhược điểm | Khi nào dùng |
|----------|----------------|---------|------------|--------------|
| **Word Cloud** | Tần suất từ | Trực quan, dễ hiểu | Mất ngữ cảnh, không chính xác | Trình bày nhanh ý chính |
| **WordTree** | Ngữ cảnh từ | Giữ ngữ cảnh, interactive | Chỉ tập trung vào 1 từ | Phân tích cách dùng từ cụ thể |
| **PhraseNet** | Quan hệ giữa từ | Thấy mối liên kết | Phức tạp với văn bản lớn | Phân tích mối quan hệ khái niệm |
| **ThemeRiver** | Xu hướng theo thời gian | Thấy sự phát triển | Cần nhiều dữ liệu theo thời gian | Phân tích xu hướng lịch sử |
| **Termite** | Topic modeling | Tổng quan đa chủ đề | Cần hiểu mô hình thống kê | Phân tích corpus lớn |
| **StoryFlow** | Tương tác nhân vật | Trực quan hóa mối quan hệ | Chỉ cho văn bản có nhân vật | Phân tích truyện, kịch bản |
| **EmotionWatch** | Phân tích cảm xúc | Hiểu phản ứng công chúng | Phụ thuộc vào chất lượng phân loại | Phân tích mạng xã hội |
| **Document Card** | So sánh tài liệu | Tổng quan nhanh | Mất chi tiết | Khám phá bộ sưu tập |

---

## 17. Quy trình làm việc thực tế

### Bước 1: Xác định mục tiêu
- Bạn muốn hiểu, nhóm, so sánh hay tương quan? 

### Bước 2: Tiền xử lý dữ liệu
- Tokenization
- Loại bỏ stop words
- Stemming/Lemmatization

### Bước 3: Chọn mô hình
- Bag of Words
- Word Embeddings
- Topic Modeling (LDA)

### Bước 4: Chọn kỹ thuật trực quan hóa
- Dựa trên mục tiêu và loại dữ liệu

### Bước 5: Đánh giá
- Trực quan hóa có trả lời câu hỏi của bạn không? 
- Có dễ hiểu với người xem không? 
- Có mất thông tin quan trọng không?

---

## 18. Lưu ý quan trọng

### ⚠️ Cẩn thận với: 

1. **Over-simplification:**
   - Word cloud có thể làm mất ngữ cảnh quan trọng

2. **Model bias:**
   - Mô hình AI có thể có thiên kiến
   - Luôn kiểm tra kết quả

3. **Scale issues:**
   - Kỹ thuật tốt cho 100 tài liệu có thể không tốt cho 1 triệu tài liệu

4. **Interpretation:**
   - Người xem có hiểu đúng không?
   - Cần giải thích rõ ràng

### ✓ Best Practices:

1. **Luôn cho phép truy cập văn bản gốc**
2. **Cung cấp ngữ cảnh**
3. **Kết hợp nhiều kỹ thuật**
4. **Kiểm tra với người dùng thực**
5. **Tài liệu hóa quyết định tiền xử lý**

---

## 19. Ứng dụng thực tế

### 📊 Phân tích mạng xã hội
- Theo dõi xu hướng Twitter
- Phân tích sentiment về sản phẩm
- Phát hiện tin giả

### 📰 Phân tích tin tức
- Theo dõi chủ đề nóng
- So sánh quan điểm các tờ báo
- Phát hiện bias trong báo chí

### 📚 Nghiên cứu học thuật
- Phân tích tài liệu văn học
- Review tổng quan nghiên cứu
- Phát hiện đạo văn

### 💼 Kinh doanh
- Phân tích phản hồi khách hàng
- Nghiên cứu thị trường
- Giám sát thương hiệu

### ⚖️ Pháp lý
- Phân tích hợp đồng
- Tìm kiếm tiền lệ
- Phân loại tài liệu
