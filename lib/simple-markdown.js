const SimpleMarkdown = {
    parse: function(markdown) {
        let html = markdown;
        
        // 1. Headers (Giữ nguyên)
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // 2. Bold (Giữ nguyên)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 3. Code blocks (Di chuyển lên trước để tránh xung đột)
        html = html.replace(/```([\s\S]*?)```/g, function(match, code) {
            return '<pre><code>' + code.trim() + '</code></pre>';
        });

        // 4. Inline code (Giữ nguyên)
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // --- BẮT ĐẦU PHẦN BỔ SUNG XỬ LÝ TABLE VÀ LIST ---
        const lines = html.split('\n');
        let result = [];
        
        let inList = false;
        let inTable = false;
        let tableHeaderProcessed = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Xử lý List (-)
            if (line.match(/^- (.*$)/)) {
                if (inTable) { result.push('</tbody></table>'); inTable = false; tableHeaderProcessed = false; } // Đóng table nếu đang mở
                if (!inList) {
                    result.push('<ul>');
                    inList = true;
                }
                result.push('<li>' + line.substring(2) + '</li>');
            } 
            // Xử lý Table (Bắt đầu bằng |)
            else if (line.startsWith('|')) {
                if (inList) { result.push('</ul>'); inList = false; } // Đóng list nếu đang mở

                if (!inTable) {
                    result.push('<table border="1" style="border-collapse: collapse; width: 100%;">');
                    inTable = true;
                    tableHeaderProcessed = false;
                }

                // Tách các cột bởi dấu |
                const columns = line.split('|').filter(col => col.trim() !== ''); // Lọc bỏ phần rỗng do | ở đầu/cuối
                
                // Kiểm tra xem đây có phải là dòng gạch ngang phân cách header không (VD: |---|---|)
                const isSeparator = columns.every(col => col.trim().match(/^[-:]+$/));

                if (isSeparator) {
                    // Bỏ qua dòng phân cách này, nhưng đánh dấu là đã xong phần header
                    continue; 
                }

                if (!tableHeaderProcessed) {
                    // Đây là dòng Header
                    result.push('<thead><tr>');
                    columns.forEach(col => result.push(`<th>${col.trim()}</th>`));
                    result.push('</tr></thead><tbody>');
                    tableHeaderProcessed = true;
                } else {
                    // Đây là dòng Body
                    result.push('<tr>');
                    columns.forEach(col => result.push(`<td>${col.trim()}</td>`));
                    result.push('</tr>');
                }
            }
            // Các dòng khác (Paragraph)
            else {
                // Đóng thẻ nếu đang mở
                if (inList) { result.push('</ul>'); inList = false; }
                if (inTable) { result.push('</tbody></table>'); inTable = false; tableHeaderProcessed = false; }

                // Xử lý paragraph
                if (!line.startsWith('<h') && !line.startsWith('<pre') && line !== '') {
                     result.push('<p>' + line + '</p>');
                } else {
                     result.push(line);
                }
            }
        }

        // Đóng các thẻ còn sót lại sau khi chạy hết vòng lặp
        if (inList) { result.push('</ul>'); }
        if (inTable) { result.push('</tbody></table>'); }

        return result.join('\n');
    }
};

// Export (Giữ nguyên)
if (typeof window !== 'undefined') {
    window.SimpleMarkdown = SimpleMarkdown;
}