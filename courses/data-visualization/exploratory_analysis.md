Nội dung bạn cung cấp tập trung vào **Exploratory Data Analysis (EDA - Phân tích dữ liệu khám phá)**. Đây là một bước cực kỳ quan trọng trong khoa học dữ liệu, giúp bạn "hiểu" dữ liệu trước khi áp dụng bất kỳ mô hình phức tạp nào.

Dưới đây là giải thích chi tiết theo từng khía cạnh:

---

### 1. Trọng tâm của EDA (Focus)

Thay vì bắt đầu bằng các giả định cứng nhắc, EDA tập trung vào chính bản thân dữ liệu:

* **Cấu trúc và Ngoại lệ (Outliers):** Tìm hiểu hình dạng của dữ liệu và phát hiện những điểm bất thường.
* **Không mất mát thông tin:** EDA cố gắng tận dụng toàn bộ dữ liệu hiện có thay vì chỉ nhìn vào các con số trung bình đơn giản.
* **Các kỹ thuật chính:** * *Thống kê tóm tắt:* (Trung bình, trung vị, phương sai).
* *Trực quan hóa:* (Biểu đồ).
* *Phân cụm (Clustering):* Nhóm các dữ liệu tương đồng.
* *Giảm chiều dữ liệu:* Làm gọn dữ liệu nhưng vẫn giữ lại đặc tính quan trọng.



### 2. Định nghĩa: EDA là một "Triết lý"

EDA không chỉ là một danh sách các công cụ, mà là một **thái độ tiếp cận**:

* Nó nhấn mạnh việc sử dụng khả năng quan sát của con người để nhận diện quy luật (patterns).
* Giúp bạn chọn đúng công cụ tiền xử lý hoặc thuật toán phân tích phù hợp nhất với đặc điểm riêng của bộ dữ liệu đó.

### 3. Các câu hỏi thường gặp trong EDA

EDA giúp trả lời những câu hỏi mang tính bản chất để định hướng cho các bước tiếp theo:

* **Giá trị điển hình là gì?** (Ví dụ: Thu nhập trung bình của khách hàng là bao nhiêu?)
* **Sự sai số/không chắc chắn ra sao?**
* **Phân phối dữ liệu thế nào?** (Dữ liệu có tuân theo quy luật phân phối chuẩn không?)
* **Các yếu tố có tác động không?** (Ví dụ: Thay đổi giao diện web có thực sự làm tăng doanh số?)
* **Phân tách Tín hiệu (Signal) và Nhiễu (Noise):** Đặc biệt quan trọng trong dữ liệu theo thời gian.
* **Dữ liệu có điểm ngoại lệ (Outliers) không?** (Những giá trị cực cao hoặc cực thấp bất thường).

### 4. EDA là một quy trình lặp (Iterative Process)

Bạn không chỉ làm EDA một lần rồi thôi. Đó là một vòng lặp:

1. Đặt câu hỏi quan trọng nhất.
2. Vẽ biểu đồ/đồ họa để tìm câu trả lời.
3. Quan sát câu trả lời và từ đó nảy sinh ra những câu hỏi mới sâu sắc hơn.
4. Lặp lại cho đến khi hiểu rõ bản chất dữ liệu.

### 5. Chiến lược và Kỹ thuật thực hiện

* **Chiến lược:** Kiểm tra từng biến độc lập (univariate), sau đó mới xem xét mối quan hệ giữa các biến (bivariate/multivariate). Luôn bắt đầu bằng hình ảnh (đồ thị) trước khi đi vào các con số cụ thể.
* **Lưu ý loại thuộc tính:** Phân biệt rõ dữ liệu Phân loại (Categorical - ví dụ: màu sắc, giới tính) và dữ liệu Số (Numeric - ví dụ: chiều cao, giá tiền) để có cách xử lý phù hợp.
* **Công cụ:**
* *Đồ họa:* Biểu đồ phân tán (scatter plots), biểu đồ hộp (box plots), biểu đồ cột (histograms)...
* *Định lượng:* Các chỉ số thống kê cụ thể.



---

Nội dung này tập trung vào cách mô tả và phân loại dữ liệu trong thống kê, đặc biệt là dữ liệu **đơn biến (univariate)**. Đây là bước đầu tiên để hiểu về "hình dáng" và đặc điểm của dữ liệu.

Dưới đây là giải thích chi tiết các khái niệm:

---

### 1. Quan sát và Biến số (Observations and Variables)

* **Observation (Quan sát):** Là một đơn vị dữ liệu cụ thể (ví dụ: một người khách hàng, một ngày bán hàng).
* **Variable/Attribute (Biến số/Thuộc tính):** Là một đặc điểm cụ thể của các quan sát đó (ví dụ: chiều cao, màu mắt, doanh thu).

**Phân loại biến số:**

* **Numeric (Biến số):** Dữ liệu dạng số.
* *Continuous (Liên tục):* Có thể nhận bất kỳ giá trị nào trong một khoảng (ví dụ: cân nặng 55.5kg, chiều cao).
* *Discrete (Rời rạc):* Chỉ nhận các giá trị nguyên, đếm được (ví dụ: số con trong gia đình, số xe ô tô).


* **Categorical (Biến phân loại):** Dữ liệu dạng nhãn hoặc nhóm.
* *Nominal (Định danh):* Không có thứ tự ưu tiên (ví dụ: màu sắc, quốc tịch).
* *Ordinal (Thứ bậc):* Có thứ tự rõ ràng (ví dụ: mức độ hài lòng: Thấp - Trung bình - Cao).



---

### 2. Số chiều của dữ liệu (Dimensionality)

Khái niệm này dựa trên số lượng biến số mà bạn đo lường trên mỗi đối tượng:

* **Univariate (Đơn biến):** Chỉ đo 1 biến duy nhất (ví dụ: chỉ thống kê về cân nặng của sinh viên).
* **Bivariate (Hai biến):** Đo 2 biến (ví dụ: đo cả chiều cao và cân nặng để xem chúng có liên quan không).
* **Multivariate (Đa biến):** Đo nhiều biến cùng lúc (ví dụ: chiều cao, cân nặng, độ tuổi, huyết áp).

---

### 3. Các phép đo xu hướng tập trung và phân tán

Khi phân tích dữ liệu đơn biến, chúng ta cần xác định hai yếu tố chính:

#### A. Measures of Location/Central Tendency (Đo lường vị trí/Xu hướng tập trung)

Mục tiêu là tìm ra con số "đại diện" nhất cho bộ dữ liệu.

* **Mean (Trung bình):** Tổng các giá trị chia cho số lượng.
* **Median (Trung vị):** Giá trị nằm chính giữa khi sắp xếp dữ liệu.
* **Mode (Yếu vị):** Giá trị xuất hiện nhiều nhất.

#### B. Measures of Scale/Spread (Đo lường sự phân tán)

Mục tiêu là xem dữ liệu của bạn tập trung hay bị trải rộng ra.

* **Range (Khoảng cách):** Giá trị lớn nhất trừ giá trị nhỏ nhất.
* **Variance & Standard Deviation (Phương sai & Độ lệch chuẩn):** Đo mức độ dữ liệu lệch khỏi giá trị trung bình.

---

### 4. Hình dạng của dữ liệu (Skewness and Kurtosis)

Ngoài giá trị trung bình và độ phân tán, chúng ta cần biết "hình dáng" của phân phối dữ liệu:

* **Skewness (Độ lệch):** Đo tính đối xứng.
* Lệch trái (Negative skew).
* Đối xứng (Symmetric).
* Lệch phải (Positive skew).


* **Kurtosis (Độ nhọn):** Đo xem đỉnh của phân phối dữ liệu nhọn hay bẹt, và các phần "đuôi" dữ liệu có chứa nhiều giá trị ngoại lệ hay không.

---



-----------
Nội dung này trình bày về các kỹ thuật trực quan hóa dữ liệu (Visualization) và các chỉ số hình dáng phân phối trong thống kê. Đây là những công cụ cốt lõi của **EDA (Phân tích dữ liệu khám phá)**.

Dưới đây là giải thích chi tiết cho từng loại:

---

### 1. Run Sequence Plot (Đồ thị chuỗi thời gian)

Đây là dạng đồ thị hiển thị các điểm dữ liệu theo trình tự thời gian mà chúng được thu thập.

* **Mục đích:** Trả lời câu hỏi về sự ổn định của dữ liệu.
* **Dịch chuyển vị trí (Shifts in location):** Giá trị trung bình có bị thay đổi đột ngột không?
* **Biến thiên (Shifts in variation):** Độ dao động có lúc hẹp, lúc rộng không?
* **Ngoại lệ (Outliers):** Có điểm nào vọt lên hoặc rơi xuống bất thường không?



---

### 2. Bar Charts (Biểu đồ cột)

Dùng để biểu diễn dữ liệu **định tính (categorical)**.

* **Đặc điểm:** Mỗi cột đại diện cho một nhóm. Chiều cao của cột tương ứng với tần suất hoặc giá trị của nhóm đó.
* **Ứng dụng:** So sánh quy mô giữa các danh mục khác nhau (Ví dụ: Doanh thu của từng chi nhánh).

---

### 3. Histogram (Biểu đồ tần suất)

Trông giống biểu đồ cột nhưng dùng cho dữ liệu **định lượng (numeric)** liên tục để xem phân phối.

* **Mục đích:**
* Xác định dạng phân phối (Chuẩn, lệch, hay đa đỉnh).
* Xem dữ liệu tập trung ở đâu và độ phân tán rộng hay hẹp.
* Phát hiện tính đối xứng hoặc các điểm ngoại lệ.



---

### 4. Box plot (Biểu đồ hộp)

Một trong những công cụ mạnh mẽ nhất để tóm tắt dữ liệu qua **5 con số thống kê**:

* **Các thành phần:** Giá trị nhỏ nhất, Tứ phân vị dưới (Q1), Trung vị (Q2), Tứ phân vị trên (Q3), và Giá trị lớn nhất.
* **Công dụng:** * So sánh giữa các nhóm nhỏ (subgroups) để xem vị trí và độ biến thiên của chúng có khác nhau không.
* **Phát hiện ngoại lệ cực kỳ hiệu quả:** Các điểm nằm ngoài "râu" của hộp thường là các outlier.



---

### 5. Skewness & Kurtosis (Độ lệch và Độ nhọn)

Đây là hai chỉ số dùng để mô tả chi tiết hình dáng của phân phối dữ liệu so với phân phối chuẩn (Normal Distribution).

* **Skewness (Độ lệch):** Đo tính bất đối xứng.
* *Symmetric:* Hai bên trái phải cân bằng.
* *Positive Skew:* Đuôi dài bên phải (nhiều giá trị nhỏ, ít giá trị cực lớn).
* *Negative Skew:* Đuôi dài bên trái.


* **Kurtosis (Độ nhọn):** * **Kurtosis cao (Leptokurtic):** Đỉnh nhọn và dốc, đuôi dày (nhiều giá trị tập trung sát trung bình nhưng cũng dễ có ngoại lệ cực đoan).
* **Kurtosis thấp (Platykurtic):** Đỉnh bẹt, dữ liệu trải phẳng ra.



---

**Tóm lại:**

* Nếu muốn xem **xu hướng theo thời gian**: Dùng *Run sequence plot*.
* Nếu muốn xem **phân phối**: Dùng *Histogram* hoặc *Skewness/Kurtosis*.
* Nếu muốn so sánh **vị trí và ngoại lệ**: Dùng *Box plot*.
* Nếu muốn so sánh **các nhóm danh mục**: Dùng *Bar chart*.

----------------

Nội dung này chuyển sang phân tích **dữ liệu nhị biến (bivariate)** và **đa biến (multivariate)**, tập trung vào việc tìm hiểu mối quan hệ giữa các yếu tố.

Dưới đây là giải thích chi tiết:

---

### 1. Scatter Plot (Biểu đồ phân tán)

Đây là công cụ cơ bản và quan trọng nhất để xem xét mối liên hệ giữa hai biến số liên tục (ví dụ: chiều cao và cân nặng, hoặc chi phí quảng cáo và doanh thu).

* **Cách hoạt động:** Biến  nằm trên trục hoành, biến  nằm trên trục tung. Mỗi dấu chấm trên biểu đồ đại diện cho một quan sát duy nhất.
* **Các câu hỏi mà Scatter Plot giải đáp:**
* **Mối quan hệ (Correlation):** Khi  tăng,  có xu hướng tăng theo (tương quan thuận), giảm đi (tương quan nghịch) hay không thay đổi gì (không tương quan)?
* **Dạng tuyến tính (Linearity):** Các điểm dữ liệu có tập trung quanh một đường thẳng không? Hay chúng tạo thành một đường cong (phi tuyến)?
* **Sự thay đổi biến thiên (Heteroscedasticity):** Độ phân tán của  có đồng đều không, hay nó rộng dần ra (hoặc hẹp lại) khi  thay đổi?
* **Ngoại lệ (Outliers):** Có điểm dữ liệu nào nằm "lạc lõng" xa hẳn so với đám đông còn lại không?



---

### 2. Scatterplot Matrix (Ma trận biểu đồ phân tán)

Khi bạn có nhiều hơn hai biến (ví dụ: ) và muốn biết tất cả các cặp biến này quan hệ với nhau như thế nào, bạn sử dụng ma trận này.

* **Định nghĩa:** Là một lưới các biểu đồ phân tán, trong đó mỗi ô là một biểu đồ cho một cặp biến cụ thể.
* **Lợi ích:**
* Giúp nhìn thấy bức tranh tổng thể của toàn bộ bộ dữ liệu chỉ trong một cái nhìn.
* Phát hiện nhanh các mối quan hệ đa chiều mà nếu xem đơn lẻ từng biến sẽ không thấy được.
* Thường được dùng trong giai đoạn đầu của EDA để chọn lọc các biến quan trọng cho mô hình dự báo.



---

### Tóm tắt ý nghĩa

Nếu **Univariate EDA** (Phân tích đơn biến) giúp bạn hiểu về "từng cá nhân", thì **Scatter Plot** và **Matrix** giúp bạn hiểu về "mối quan hệ xã hội" giữa các biến số đó.

**Ví dụ thực tế:**

* Nếu bạn vẽ Scatter plot giữa **"Số giờ học"** () và **"Điểm thi"** (), bạn mong đợi thấy một đường thẳng đi lên (tương quan thuận tuyến tính).
* Nếu bạn thấy các điểm dữ liệu nằm rải rác không quy luật, điều đó có nghĩa là số giờ học không quyết định điểm thi trong bộ dữ liệu đó.

Bạn có muốn tôi giải thích thêm về cách đọc **Hệ số tương quan (Correlation Coefficient)** – con số thường đi kèm với các biểu đồ phân tán này không?


---------------
Nội dung này giới thiệu về hai loại biểu đồ nâng cao dùng để phân tích mối quan hệ giữa các biến trong các điều kiện đặc thù: **Lag Plot** (cho dữ liệu chuỗi thời gian) và **Contour Plot** (cho dữ liệu 3 chiều).

Dưới đây là giải thích chi tiết:

---

### 1. Lag Plot (Biểu đồ trễ)

Đây là một công cụ chuyên dụng trong phân tích chuỗi thời gian (time series) để kiểm tra xem giá trị hiện tại có phụ thuộc vào các giá trị trong quá khứ hay không.

* **Khái niệm "Lag" (Độ trễ):** Nếu bạn có một dãy số theo thời gian, Lag  của một giá trị tại thời điểm  chính là giá trị đứng trước nó  bước.
* *Ví dụ:* Nếu hôm nay là , thì Lag 1 là giá trị hôm qua (), Lag 3 là giá trị của 3 ngày trước ().


* **Cách vẽ:** Đồ thị này biểu diễn  trên trục tung và  trên trục hoành.
* **Mục đích:**
* **Kiểm tra tính ngẫu nhiên:** Nếu các điểm chấm tán loạn không quy luật, dữ liệu là ngẫu nhiên (random).
* **Tự tương quan (Serial correlation):** Nếu các điểm tạo thành một đường (thẳng hoặc cong), dữ liệu có tính tự tương quan (giá trị hôm nay bị ảnh hưởng bởi quá khứ).
* **Xác định mô hình:** Giúp chọn mô hình dự báo phù hợp (ví dụ: mô hình tự hồi quy AR).
* **Phát hiện ngoại lệ:** Tìm ra các thời điểm có sự thay đổi bất thường so với quy luật thời gian thông thường.



---

### 2. Contour Plot (Biểu đồ đường đồng mức)

Đây là cách biểu diễn dữ liệu **3 chiều (3D)** lên một mặt phẳng **2 chiều (2D)**. Bạn có thể tưởng tượng nó giống như một bản đồ địa hình của một quả núi.

* **Cách hoạt động:**
* Trục  và  đại diện cho hai biến độc lập.
* Biến thứ ba () được thể hiện bằng các **đường cong (contour lines)**. Tất cả các điểm nằm trên cùng một đường cong sẽ có cùng giá trị .


* **Mục đích:** Trả lời câu hỏi **" thay đổi như thế nào khi  và  cùng biến thiên?"**
* **Ứng dụng thực tế:**
* Trong khí tượng: Các đường đẳng nhiệt (cùng nhiệt độ) hoặc đẳng áp (cùng áp suất).
* Trong kinh doanh: Xem xét sự thay đổi của Lợi nhuận () dựa trên hai yếu tố là Giá bán () và Chi phí quảng cáo ().
* Trong kỹ thuật: Tối ưu hóa bề mặt phản ứng (Response Surface Methodology).



---

### Tóm tắt sự khác biệt:

* **Lag Plot:** Dùng để "soi" quá khứ của chính nó (Dữ liệu 1 biến theo thời gian).
* **Contour Plot:** Dùng để xem mối quan hệ phức tạp giữa 3 biến số cùng lúc (Dữ liệu không gian hoặc bề mặt).



---------
Identifing and understanding groups
Clustering Methods in Exploratory Analysis

Motivation
• Decomposing a data set into simpler subsets helps
make sense of the entire collection of observations
• uncover relationships in the data such as groups of
consumers who buy certain combinations of products
• identify rules from the data
• discover observations dissimilar from those in the major
identified groups (possible errors or anomalies)

Clustering
• A way of grouping together data samples that are
similar in some way - according to some criteria
• A form of unsupervised learning – you generally don’t
have examples demonstrating how the data should be
grouped together

Can we find things that are close together?
• Clustering organizes things that are close into groups
• How do we define close?
• How do we group things?
• How do we visualize the grouping?
• How do we interpret the grouping?

Types of clustering
• Hierarchical clustering
• Flat clustering



