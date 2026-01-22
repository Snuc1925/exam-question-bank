# Visual Model & Visual Encoding

## 1. Data Types - Levels of Measurement (Stevens, 1946)

Để hiểu cách dữ liệu được chuyển đổi (map) thành hình ảnh, trước tiên chúng ta cần hiểu rõ bản chất của dữ liệu thông qua các cấp độ đo lường.  Hệ thống phân loại của Stevens (1946) chia dữ liệu thành 4 cấp độ chính, viết tắt là **N-O-Q**. 

Dưới đây là giải thích chi tiết từng cấp độ và ý nghĩa của chúng trong phân tích: 

---

### 1. Nominal (Định danh - N)

Đây là cấp độ đo lường cơ bản nhất, chỉ dùng để phân loại các đối tượng vào các nhóm riêng biệt.

* **Đặc điểm:**
  * Các danh mục không có thứ tự nội tại. 
  * Không có giá trị định lượng, các phép toán toán học (cộng, trừ, nhân, chia) đều không có ý nghĩa. 

* **Ví dụ:** Màu sắc, giới tính (Nam/Nữ), các dòng xe ô tô, màu mắt. 

### 2. Ordinal (Thứ bậc - O)

Cấp độ này phân loại các đối tượng vào các nhóm có thứ tự hoặc thứ hạng rõ ràng.

* **Đặc điểm:**
  * Có thể xác định giá trị này lớn hơn hay nhỏ hơn giá trị kia.
  * **Khoảng cách giữa các bậc không nhất quán:** Bạn biết hạng 1 nhanh hơn hạng 2, nhưng không biết hạng 1 nhanh hơn hạng 2 bao nhiêu giây nếu chỉ dựa vào thứ hạng.

* **Ví dụ:** Thứ hạng trong cuộc đua (1, 2, 3), mức độ đánh giá {Thấp=1, Trung bình=2, Cao=3}.

### 3. Interval (Khoảng cách - Q)

Ở cấp độ này, khoảng cách giữa các giá trị có ý nghĩa thực tế và nhất quán.

* **Đặc điểm:**
  * Sự chênh lệch giữa 60°F và 61°F bằng đúng sự chênh lệch giữa 100°F và 101°F. 
  * **Không có điểm "0" tuyệt đối:** Giá trị 0 không có nghĩa là sự vắng mặt hoàn toàn của biến đó (ví dụ: 0°C không có nghĩa là "không có nhiệt độ").
  * Các phép tính cộng/trừ có ý nghĩa, nhưng phép nhân/chia (tỷ lệ) thì không.

* **Ví dụ:** Nhiệt độ tính theo độ F hoặc độ C. 

### 4. Ratio (Tỷ lệ - Q)

Đây là cấp độ đo lường cao nhất, kết hợp tất cả đặc điểm của 3 loại trên và bổ sung thêm điểm "0" tuyệt đối. 

* **Đặc điểm:**
  * **Có điểm "0" thật sự:** Giá trị 0 nghĩa là sự vắng mặt hoàn toàn của đối tượng đo lường.
  * Cả hiệu số và tỷ lệ đều có ý nghĩa:  Một người 20 tuổi thực sự già gấp đôi người 10 tuổi.
  * Độ Kelvin là thang đo tỷ lệ vì 0K là độ không tuyệt đối (không gì có thể lạnh hơn).

* **Ví dụ:** Chiều dài, diện tích, dân số, nhiệt độ Kelvin.

---

### Ý nghĩa của các cấp độ đo lường (Significance)

Việc hiểu rõ dữ liệu thuộc cấp độ nào đóng vai trò "kim chỉ nam" cho mọi quyết định phân tích: 

* **Xác định phương pháp thống kê:** Dữ liệu Định danh cần các phép phân tích khác hoàn toàn so với dữ liệu Tỷ lệ.
* **Lựa chọn cách trực quan hóa:**
  * Dùng **Biểu đồ cột (Bar chart)** cho dữ liệu Thứ bậc (Ordinal).
  * Dùng **Biểu đồ tần suất (Histogram)** cho dữ liệu Khoảng cách (Interval).

---

## 2. Image Model - Mô hình Hình ảnh

Nội dung này đề cập đến việc xây dựng một **Image Model (Mô hình hình ảnh)** để chuyển đổi dữ liệu thành thông tin thị giác.  Đây là nền tảng của ngôn ngữ hình ảnh, nơi chúng ta sử dụng các ký hiệu để truyền tải thông điệp. 

Dưới đây là giải thích chi tiết về cách thức vận hành của mô hình này:

### 1. Ngôn ngữ thị giác là một hệ thống ký hiệu (Visual Language as a sign system)

* Hình ảnh được coi là một tập hợp các **ký hiệu (signs)**. 
* Người gửi sẽ **mã hóa (encodes)** thông tin vào các ký hiệu này.
* Người nhận sẽ **giải mã (decodes)** thông tin từ các ký hiệu đó để hiểu ý nghĩa.

### 2. Thành phần của Mô hình Hình ảnh (Image Models)

Mô hình này bao gồm hai phần chính:  các đối tượng biểu diễn và cách chúng thay đổi để mang thông tin.

#### A. Visual Marks (Đối tượng biểu diễn)

Đây là các thành phần đồ họa cơ bản trong một hình ảnh dùng để đại diện cho thông tin (các mục hoặc các mối liên kết). Có 3 loại chính:

* **Points (Điểm):** Không có chiều (về mặt khái niệm).
* **Lines (Đường):** Có một chiều (chiều dài).
* **Areas (Vùng):** Có hai chiều (diện tích).

#### B.  Perceptual Channels (Kênh nhận thức / Biến thị giác)

Đây là các yếu tố dùng để điều khiển sự xuất hiện của các **Visual Marks**.  Chúng thay đổi vẻ ngoài của đối tượng dựa trên giá trị của thuộc tính dữ liệu để mã hóa thông tin. 

* **Ví dụ về các kênh:** Kích thước, màu sắc, độ đậm nhạt, hướng, vị trí. 

---

### 3. Ví dụ cụ thể về Visual Marks

Dưới đây là các ví dụ minh họa cách dùng đối tượng biểu diễn để mô tả dữ liệu:

#### Visual marks to represent items (Đối tượng đại diện cho các hạng mục/phần tử)

Mục tiêu là dùng các hình khối để thể hiện sự tồn tại của một dữ liệu cụ thể. 

* **Điểm (Points):** Trong biểu đồ phân tán (Scatter plot), mỗi dấu chấm đại diện cho một quan sát (ví dụ: một khách hàng hoặc một điểm dữ liệu).
* **Vùng (Areas):** Trong biểu đồ cột (Bar chart), mỗi hình chữ nhật đại diện cho một nhóm dữ liệu (ví dụ: doanh thu của tháng 1).
* **Điểm/Hình ảnh:** Trên bản đồ số, các icon (như icon nhà hàng, khách sạn) là các điểm đại diện cho các địa điểm cụ thể.

#### Visual marks to represent links (Đối tượng đại diện cho các liên kết)

Mục tiêu là thể hiện mối quan hệ hoặc sự kết nối giữa các phần tử.

* **Đường (Lines):** Trong một sơ đồ mạng lưới (Network diagram), các đường kẻ nối giữa hai vòng tròn đại diện cho mối quan hệ bạn bè giữa hai người.
* **Đường thẳng có mũi tên:** Trong sơ đồ quy trình (Flowchart), mũi tên n���i giữa các bước đại diện cho thứ tự thực hiện hoặc luồng xử lý.
* **Vùng bao quanh (Enclosure):** Vẽ một vòng tròn bao quanh một nhóm các điểm để thể hiện chúng cùng thuộc một tập hợp hoặc một phân cụm (cluster).

---

## 3. Perceptual Channels - Thứ tự ưu tiên của các kênh thị giác

Hình ảnh bạn cung cấp là một kiến thức nền tảng rất quan trọng trong **Data Visualization (Trực quan hóa dữ liệu)**, dựa trên lý thuyết của Tamara Munzner. Nó giải thích cách chúng ta dùng các "kênh cảm giác" (perceptual channels) để bộ não con người tiếp nhận dữ liệu hiệu quả nhất.

Dưới đây là giải thích chi tiết được chia làm hai nhóm chính theo hình ảnh:

---

### 1. Nhóm Định lượng & Thứ tự (Quantitative/Ordered)

Nhóm này dùng cho các loại dữ liệu có thể đo lường bằng số (Quantitative - Q) hoặc có thứ tự rõ ràng (Ordinal - O), ví dụ:  doanh thu, chiều cao, hoặc mức độ đánh giá (thấp, trung bình, cao).

* **Vị trí (Position):** Là kênh **mạnh mẽ nhất**. Con người rất giỏi trong việc nhận ra sự khác biệt về vị trí trên một thước đo chung (như biểu đồ cột hoặc biểu đồ đường).
* **Độ dài (Length):** Rất hiệu quả để so sánh các giá trị 1D. Chúng ta dễ dàng thấy được một vạch dài gấp đôi vạch kia.
* **Độ nghiêng/Góc (Tilt/Angle):** Thường dùng trong biểu đồ tròn (pie chart), nhưng mắt người kém nhạy bén với góc hơn là vị trí hoặc độ dài. 
* **Diện tích & Thể tích (Area/Volume):** Càng nhiều chiều (2D, 3D) thì mắt người càng khó ước lượng chính xác.  Ví dụ:  Bạn khó có thể nói chính xác một hình tròn lớn gấp bao nhiêu lần hình tròn nhỏ chỉ bằng mắt thường. 
* **Độ sáng & Độ bão hòa (Luminance/Saturation):** Màu càng đậm hoặc sáng thường được hiểu là giá trị càng cao.  Đây là kênh dùng để thể hiện sự tăng dần. 

---

### 2. Nhóm Định danh (Nominal)

Nhóm này dùng cho dữ liệu phân loại, không có thứ tự hơn kém (Nominal - N), ví dụ: giới tính, quốc gia, các loại trái cây, hoặc các phòng ban trong công ty.

* **Vùng không gian (Spatial region):** Gom nhóm các đối tượng cùng loại vào một khu vực riêng biệt. 
* **Màu sắc (Color Hue):** Đây là kênh phổ biến nhất cho dữ liệu định danh.  Ví dụ:  Màu đỏ cho "Táo", màu vàng cho "Chuối". 
  * *Lưu ý:* Nên giới hạn số lượng màu (thường dưới 6-10 màu) để tránh gây nhiễu. 

* **Hình dáng (Shape):** Dùng các ký hiệu khác nhau (vuông, tròn, tam giác) để phân biệt các nhóm.  Hình dáng không có tính thứ tự (không ai nói hình tròn "lớn" hay "cao" hơn hình tam giác về mặt ý nghĩa).
* **Chuyển động (Motion):** Các vật thể di chuyển cùng hướng hoặc cùng nhịp điệu thường được hiểu là thuộc cùng một nhóm.

---

### Bảng tóm tắt hiệu quả (Sắp xếp từ mạnh đến yếu)

| Loại dữ liệu | Kênh hiệu quả nhất | Kênh ít hiệu quả hơn |
|---|---|---|
| **Định lượng (Q)** | Vị trí (Position) > Độ dài (Length) | Diện tích (Area) > Màu sắc (Độ đậm nhạt) |
| **Định danh (N)** | Vị trí (Region) > Màu sắc (Sắc thái) | Hình dáng (Shape) |

**Tại sao điều này quan trọng?**

Nếu bạn dùng **Màu sắc (Sắc thái - Hue)** để biểu diễn **Doanh thu**, người xem sẽ rất bối rối vì họ không biết màu Xanh lá với màu Tím thì cái nào nhiều tiền hơn. Nhưng nếu bạn dùng **Vị trí** (biểu đồ cột), họ sẽ hiểu ngay lập tức.

---

## 4. Visual Encoding - Nguyên tắc và Tiêu chí Thiết kế

Visual encoding là quá trình chuyển đổi dữ liệu (con số, phạm vi, danh mục) thành các yếu tố thị giác (hình dạng, màu sắc, vị trí) để con người có thể hiểu được.  Đây là "ngôn ngữ" cốt lõi của visualization.

Dưới đây là giải thích chi tiết dựa trên các nguyên tắc bạn đã cung cấp:

---

### 1. Thách thức trong việc lựa chọn Encoding

Khi bạn có **n** thuộc tính dữ liệu (ví dụ: doanh thu, khu vực, thời gian) và **m** kênh thị giác (ví dụ: chiều dài, màu sắc, độ sáng), số lượng cách kết hợp có thể lên tới **n!  × m! **. 
* **Vấn đề:** Không phải mọi cách kết hợp đều hiệu quả. Việc chọn sai encoding có thể khiến người xem hiểu lầm hoặc tốn quá nhiều thời gian để xử lý thông tin. 

### 2. Hai nguyên tắc nền tảng (Mackinlay)

* **Nguyên tắc Nhất quán (Principle of Consistency):** Thuộc tính của hình ảnh phải tương xứng với thuộc tính dữ liệu.
  * *Ví dụ:* Nếu dữ liệu là số thứ tự (1, 2, 3), đừng dùng các màu sắc không có tính thứ tự (đỏ, xanh, vàng) để biểu diễn chúng.

* **Nguyên tắc Thứ tự Quan trọng (Principle of Importance Ordering):** Bạn phải xác định đâu là biến số quan trọng nhất và dành cho nó kênh thị giác "mạnh" nh���t (thường là **Vị trí - Position**).

---

### 3. Tiêu chí Thiết kế:  Expressiveness & Effectiveness

Đây là hai cột trụ giúp đánh giá một biểu đồ có "tốt" hay không:

#### **Tính Diễn đạt (Expressiveness)**

Một biểu đồ có tính diễn đạt tốt khi nó: 

* **Nói sự thật:** Biểu thị đúng mọi mối quan hệ trong dữ liệu. 
* **Không thừa, không thiếu:** Không gợi ý những mối quan hệ không tồn tại trong dữ liệu thực tế.
  * *Lỗi thường gặp: * Dùng biểu đồ đường (Line chart) cho dữ liệu rời rạc (như danh sách các quốc gia). Đường nối giữa hai quốc gia gợi ý một sự liên tục hoặc xu hướng, trong khi thực tế không có. 
#### **Tính Hiệu quả (Effectiveness)**

Hiệu quả được đo bằng khả năng **giải mã (decode)** của con người.  Một encoding hiệu quả hơn nếu người xem nắm bắt thông tin: 

* Nhanh hơn. 
* Chính xác hơn.
* Tốn ít nỗ lực não bộ hơn.

---

### 4. Thuật toán APT của Mackinlay (1986)

Jock Mackinlay đã tự động hóa việc này bằng một công cụ gọi là APT.  Quy trình hoạt động như sau:

1. **Đầu vào:** Một danh sách các biến dữ liệu được sắp xếp theo thứ tự ưu tiên. 
2. **Kiểm tra tính Diễn đạt:** Loại bỏ tất cả các cách biểu diễn "sai" (ví dụ: dùng màu sắc để biểu thị dữ liệu định lượng liên tục).
3. **Xếp hạng tính Hiệu quả:** Dựa trên các nghiên cứu về nhận thức (Perceptual ranking), thuật toán sẽ chọn kênh tốt nhất cho biến quan trọng nhất.
   * *Thứ tự ưu tiên thông thường:* Position (Vị trí) > Length (Độ dài) > Angle (Góc độ) > Area (Diện tích) > Color (Màu sắc).

4. **Đầu ra:** Biểu đồ tối ưu nhất về mặt thị giác. 

---

### 5. Bài học rút ra (Takeaway)

* **Tránh "Over-encoding":** Đừng cố nhồi nhét quá nhiều kênh thị giác (vừa màu sắc, vừa kích thước, vừa hình dáng) cho cùng một loại dữ liệu, nó sẽ gây nhiễu.
* **Tương tác là chìa khóa:** Thay vì cố gắng tạo ra một biểu đồ "vạn năng" giải quyết mọi câu hỏi, hãy tạo ra các biểu đồ đơn giản, hiệu quả và cho phép người dùng **tương tác** (lọc, zoom, chuyển đổi) để tìm câu trả lời.

> **Ghi nhớ:** Khả năng tạo ra các góc nhìn phù hợp một cách nhanh chóng quan trọng hơn việc tìm kiếm một biểu đồ duy nhất hoàn hảo. 