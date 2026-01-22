# Trực quan hóa dữ liệu dạng bảng và đa chiều

**Môn học:** Trực quan hóa dữ liệu  
**Trường:** Đại học Bách Khoa Hà Nội (HUST)  
**Khoa:** Công nghệ Thông tin và Truyền thông

---

## Tổng quan bài giảng

### Các bài giảng trước
- Mô hình trực quan và mã hóa trực quan
- Nhận thức đồ họa (giải mã trực quan)

### Nội dung hôm nay
- Trực quan hóa cho dữ liệu dạng bảng và đa chiều

### Đề cương khóa học
1. Hệ tọa độ và các trục
2. Thang màu sắc
3. Trực quan hóa số lượng
4. Trực quan hóa phân phối
5. Trực quan hóa nhiều phân phối cùng lúc

### Bài học tiếp theo
- Trực quan hóa tỷ lệ
- Trực quan hóa mối liên hệ
- Trực quan hóa xu hướng
- Trực quan hóa độ không chắc chắn

---

## 1. Hệ tọa độ và các trục

### 1.1 Tọa độ Descartes (Cartesian)

**Định nghĩa:** 
- Hệ tọa độ Descartes 2D trong đó mỗi vị trí được xác định duy nhất bởi giá trị x và y
- Trục x và y vuông góc với nhau
- Giá trị dữ liệu được đặt cách đều nhau dọc theo cả hai trục

**Ví dụ:  Nhiệt độ hàng ngày ở Houston**
- Cùng một dữ liệu có thể hiển thị với các tỷ lệ khung hình khác nhau
- Tất cả đều là cách trực quan hóa hợp lệ
- **Quy tắc quan trọng:** Nếu trục x và y cùng đơn vị đo, khoảng cách lưới phải bằng nhau

### 1.2 Trục phi tuyến (Nonlinear)

**Khi nào sử dụng:**
- Thang tuyến tính không phải lúc nào cũng phù hợp
- **Ví dụ v���n đề:** Dân số các quận Texas so với giá trị trung vị
  - Hiển thị tỷ lệ trên thang tuyến tính làm phóng đại tỷ lệ > 1
  - Che mờ các tỷ lệ < 1
  - **Quy tắc chung:** Tỷ lệ KHÔNG nên hiển thị trên thang tuyến tính

**Thang logarit:**
- Khoảng cách đều trong trực quan hóa tương ứng với khoảng cách không đều trong đơn vị dữ liệu
- Hữu ích cho dữ liệu dạng tỷ lệ
- Ví dụ: Quận đông dân nhất có ~100 lần nhiều dân hơn trung vị; quận ít dân nhất có ~100 lần ít hơn

### 1.3 Thang căn bậc hai (Square-Root Scale)

**Trường hợp sử dụng:**
- Thang tự nhiên cho dữ liệu dạng hình vuông/diện tích
- Ví dụ: Diện tích các bang miền Đông Bắc Hoa Kỳ
- Biểu diễn tốt hơn thang tuyến tính cho dữ liệu diện tích

### 1.4 Hệ tọa độ cực (Polar)

**Đặc điểm:**
- Vị trí được xác định qua góc và khoảng cách hướng tâm từ gốc
- Trục góc là hình tròn
- **Tốt nhất cho:** Dữ liệu tuần hoàn, giá trị ở đầu này có thể nối logic với giá trị ở đầu kia

**Ví dụ:** Nhiệt độ trung bình hàng ngày cho 4 địa điểm được chọn ở Hoa Kỳ (chu kỳ hàng năm)

---

## 2. Thang màu sắc

### 2.1 Ba trường hợp sử dụng cơ bản

1. **Phân biệt các nhóm** dữ liệu với nhau
2. **Biểu diễn giá trị** dữ liệu
3. **Làm nổi bật** thông tin cụ thể

### 2.2 Thang màu định tính (Qualitative)

**Mục đích:** Phân biệt các mục hoặc nhóm rời rạc không có thứ tự vốn có

**Đặc điểm:**
- Tập hợp hữu hạn các màu cụ thể
- Các màu trông rõ ràng khác biệt với nhau
- Các màu tương đương với nhau

**Ví dụ:** Các quốc gia khác nhau trên bản đồ, các nhà sản xuất khác nhau

**Ví dụ ứng dụng:** Tăng trưởng dân số ở Hoa Kỳ từ 2000 đến 2010

### 2.3 Thang màu tuần tự (Sequential)

**Mục đích:** Biểu diễn giá trị dữ liệu định lượng

**Đặc điểm:**
- Chỉ rõ giá trị nào lớn hơn hoặc nhỏ hơn
- Cho thấy hai giá trị cách nhau bao xa

**Ví dụ:** Thu nhập trung vị hàng năm ở các quận Texas (thu nhập, nhiệt độ, tốc độ)

### 2.4 Thang màu phân kỳ (Diverging)

**Mục đích:** Trực quan hóa độ lệch theo hai hướng so với điểm giữa trung lập

**Cấu trúc:** Hai thang tuần tự ghép lại tại màu điểm giữa chung

**Ví dụ:** Tỷ lệ phần trăm người tự nhận là da trắng ở các quận Texas

### 2.5 Màu sắc để làm nổi bật

**Mục đích:** Thu hút sự chú ý đến thông tin chủ chốt

**Kỹ thuật:**
- Sử dụng màu nổi bật so với phần còn lại của hình
- Làm nổi bật các danh mục hoặc giá trị mang thông tin câu chuyện chính

**Ví dụ:** Vận động viên điền kinh nằm trong số những vận động viên nam chuyên nghiệp thấp nhất và gầy nhất

---

## 3. Trực quan hóa số lượng

### 3.1 Kịch bản
Trực quan hóa độ lớn của một tập hợp số:  
- Một tập hợp các danh mục (thương hiệu, thành phố, môn thể thao)
- Một giá trị định lượng cho mỗi danh mục

### 3.2 Biểu đồ cột (Bar Plots)

**Ví dụ:** Phim có doanh thu cao nhất cuối tuần 22-24/12/2017

**Cột dọc vs.  Cột ngang:**
- **Cột dọc:** Hướng chuẩn
- **C��t ngang:** Tốt hơn khi nhãn danh mục dài
- Tránh xoay nhãn trục

**Quy tắc sắp xếp:**
- **Không có thứ tự tự nhiên:** Sắp xếp theo giá trị (thường là giảm dần)
- **Có thứ tự tự nhiên:** Giữ nguyên thứ tự tự nhiên

**Ví dụ về thứ tự tự nhiên:** Thu nhập hộ gia đình trung vị Hoa Kỳ năm 2016 theo nhóm tuổi
- Giữ các nhóm tuổi theo thứ tự thời gian
- Không sắp xếp lại theo giá trị (sẽ gây nhầm lẫn)

### 3.3 Cột nhóm và cột xếp chồng

**Biểu đồ cột nhóm:**
- Nhiều biến phân loại cùng lúc
- Các nhóm cột cạnh nhau
- Ví dụ: Thu nhập hộ gia đình trung vị Hoa Kỳ 2016 theo nhóm tuổi VÀ chủng tộc

**Phương án thay thế:** Hiển thị dưới dạng các biểu đồ cột riêng biệt
- Ưu điểm: Không cần mã hóa biến phân loại bằng màu cột

**Cột xếp chồng:**
- Hữu ích khi tổng các số lượng có ý nghĩa
- Ví dụ: Hành khách nữ và nam trên Titanic theo hạng (1, 2, 3)

**Quan trọng:** Biểu đồ cột phải có đường cơ sở tại số 0

### 3.4 Biểu đồ chấm (Dot Plots)

**Đặc điểm:**
- Thay thế cho biểu đồ cột
- Dùng điểm thay vì cột
- Ví dụ:  Tuổi thọ của các quốc gia ở Châu Mỹ, 2007

**Sắp xếp:** Chú ý đến thứ tự giá trị dữ liệu để rõ ràng

### 3.5 Bản đồ nhiệt (Heatmaps)

**Mục đích:** Ánh xạ giá trị dữ liệu thành màu sắc

**Đánh đổi:**
- **Nhược điểm:** Khó xác định giá trị dữ liệu chính xác
- **Ưu điểm:** Xuất sắc trong việc làm nổi bật xu hướng tổng quát

---

## 4. Trực quan hóa phân phối

### 4.1 Trực quan hóa phân phối đơn

**Mục tiêu:** Hiểu cách một biến cụ thể phân bố trong tập dữ liệu

### 4.2 Biểu đồ tần suất (Histograms)

**Cấu trúc:**
- Chia dữ liệu thành các bin (khoảng)
- Đếm số quan sát trong mỗi bin
- Hiển thị dưới dạng cột

**Ví dụ:** Tuổi của hành khách Titanic

**Vấn đề quan trọng:** Histogram phụ thuộc vào độ rộng bin đã chọn
- Quá hẹp: Nhiễu, khó thấy mẫu
- Quá rộng: Quá mịn, mất chi tiết

### 4.3 Biểu đồ mật độ (Density Plots)

**Mục đích:** Trực quan hóa phân phối xác suất cơ bản

**Phương pháp:** Ước lượng mật độ kernel (KDE)
- Vẽ đường cong liên tục phù hợp
- Ước lượng từ dữ liệu

**Ví dụ:** Phân phối tuổi của hành khách Titanic

**Tham số ảnh hưởng đến kết quả:**
- Lựa chọn kernel
- Lựa chọn bandwidth (độ rộng băng thông)

**Hạn chế:** Có thể mở rộng đuôi vào vùng không thể (ví dụ: tuổi âm)

---

## 5. Trực quan hóa nhiều phân phối

### 5.1 Thách thức với Histogram

**Vấn đề:** Histogram về tuổi phân tầng theo giới tính
- Chiều cao các cột không dễ so sánh với nhau

**Giải pháp 1:** Làm trong suốt các cột và đặt chồng lên nhau
- Vấn đề: Không có chỉ báo trực quan rõ ràng rằng tất cả cột xanh bắt đầu từ 0

### 5.2 Biểu đồ mật độ chồng lấp

**Ưu điểm:** 
- Các đường mật độ liên tục giúp mắt phân biệt các phân phối
- Dễ so sánh hơn histogram chồng lấp

**Ví dụ:** Phân phối tuổi của hành khách Titanic nam và nữ

### 5.3 Phân tách theo tỷ lệ

**Phương pháp:** Hiển thị phân phối tuổi riêng biệt, mỗi cái như một tỷ lệ của phân phối tuổi tổng thể

### 5.4 Kim tự tháp tuổi (Age Pyramid)

**Cấu trúc:** 
- Histogram riêng biệt, xoay 90 độ
- Một bên cho nam, một bên cho nữ
- Ví dụ: Phân phối tuổi của hành khách Titanic nam và nữ

### 5.5 Biểu đồ mật độ cho nhiều phân phối

**Hoạt động tốt khi:**
- Các phân phối hơi khác biệt
- Các phân phối liền kề

**Ví dụ:** Ước lượng mật độ về phần trăm butterfat trong sữa của 4 giống bò

---

## 6. Trực quan hóa nhiều phân phối cùng lúc

### 6.1 Kịch bản

**Mục tiêu:** Trực quan hóa nhiều phân phối cùng lúc

**Ví dụ:** Nhiệt độ thay đổi như thế nào qua các tháng khác nhau, đồng thời hiển thị phân phối nhiệt độ quan sát được trong mỗi tháng

### 6.2 Trực quan hóa phân phối dọc theo trục dọc

**Phương pháp cơ bản:**
- Hiển thị giá trị trung bình hoặc trung vị dưới dạng điểm
- Hiển thị chỉ báo về độ biến thiên xung quanh giá trị trung bình/trung vị bằng thanh lỗi (error bars)

**Vấn đề:**
- Mất nhiều thông tin về dữ liệu
- Không rõ ràng ngay lập tức các điểm đại diện cho gì
- Không rõ ràng thanh lỗi đại diện cho gì

### 6.3 Biểu đồ hộp (Boxplot)

**Lịch sử:** Được phát minh bởi nhà thống kê John Tukey những năm 1970

**Cấu trúc:**
- Hộp:  Từ phân vị thứ 25 đến phân vị thứ 75 (IQR - khoảng tứ phân vị)
- Đường giữa hộp: Trung vị
- Râu (whiskers): Mở rộng đến 1.5 × IQR
- Điểm ngoại lai: Nằm ngoài râu

**Ví dụ:** Nhiệt độ trung bình hàng ngày ở Lincoln, NE dưới dạng boxplot

### 6.4 Biểu đồ violin (Violin Plots)

**Cấu trúc:**
- Chỉ giá trị y của các điểm được trực quan hóa
- Độ rộng của violin tại giá trị y cho biết mật độ điểm tại y đó
- Về mặt kỹ thuật:  Ước lượng mật độ xoay 90 độ rồi phản chiếu

**Ví dụ:** Nhiệt độ trung bình hàng ngày ở Lincoln, NE dưới dạng violin plots

### 6.5 Biểu đồ dải (Strip Charts)

**Định nghĩa:** Hiển thị dữ liệu số dọc theo một dải đơn

**Khi nào tốt:**
- Kích thước mẫu nhỏ
- Muốn thấy các điểm dữ liệu riêng lẻ

**Kỹ thuật:**
- Trải các điểm ra dọc theo trục x
- Thêm nhiễu ngẫu nhiên theo chiều x (jittering) để tránh trùng lặp

**Ví dụ:** Nhiệt độ trung bình hàng ngày ở Lincoln, NE dưới dạng strip charts

### 6.6 Biểu đồ sina (Sina Plots)

**Đặc điểm:** 
- Kết hợp các điểm riêng lẻ và violin
- Các điểm được phân bố theo hình dạng violin

**Ví dụ:** Nhiệt độ trung bình hàng ngày ở Lincoln, NE dưới dạng sina plots

### 6.7 Trực quan hóa phân phối dọc theo trục ngang

**Biểu đồ đường chân trời (Ridgeline Plots):**

**Đặc điểm:**
- Trông giống như đường chân trời núi
- Sử dụng ước lượng mật độ tiêu chuẩn
- Mục đích: So sánh hình dạng mật độ và chiều cao tương đối giữa các nhóm

**Ưu điểm:** 
- Mở rộng tốt cho số lượng lớn phân phối
- Dễ so sánh xu hướng theo thời gian

**Ví dụ 1:** Sự phát triển của độ dài phim theo thời gian
- Cho thấy phim đã dài hơn theo thời gian

**Ví dụ 2:** Mô hình bỏ phiếu tại Hạ viện Hoa Kỳ
- Ridgeline plot được sử dụng để so sánh hai xu hướng theo thời gian
- Cho thấy mô hình bỏ phiếu ngày càng phân cực

---

## Tóm tắt kiến thức chính

### Hệ tọa độ
1. **Tuyến tính (Linear):** Cho hầu hết dữ liệu thông thường
2. **Logarit (Log):** Cho dữ liệu tỷ lệ, phạm vi rộng
3. **Căn bậc hai (Square-root):** Cho dữ liệu diện tích
4. **Cực (Polar):** Cho dữ liệu tuần hoàn/chu kỳ

### Màu sắc
1. **Định tính (Qualitative):** Phân biệt danh mục
2. **Tuần tự (Sequential):** Giá trị tăng dần
3. **Phân kỳ (Diverging):** Lệch khỏi điểm giữa
4. **Làm nổi bật (Highlight):** Thu hút chú ý

### Số lượng
1. **Biểu đồ cột (Bar charts):** Chuẩn, dễ đọc
2. **Biểu đồ chấm (Dot plots):** Tương tự cột, ít mực hơn
3. **Bản đồ nhiệt (Heatmaps):** Cho xu hướng tổng quát

### Phân phối
1. **Histogram:** Đơn giản, cần chọn bin width cẩn thận
2. **Density plot:** Mượt mà hơn, cần chọn bandwidth
3. **Boxplot:** Tóm tắt thống kê
4. **Violin plot:** Kết hợp boxplot và density
5. **Strip/Sina plot:** Hiển thị dữ liệu thô
6. **Ridgeline plot:** Cho nhiều phân phối

---

## Lưu ý quan trọng

⚠️ **Luôn nhớ:**
- Chọn thang đúng cho dữ liệu (tuyến tính, log, căn bậc hai)
- Không hiển thị tỷ lệ trên thang tuyến tính
- Biểu đồ cột phải bắt đầu từ 0
- Giữ thứ tự tự nhiên khi có
- Chọn màu phù hợp với mục đích
- Histogram và density plot nhạy cảm với tham số
- Xem xét số lượng phân phối khi chọn phương pháp trực quan hóa
