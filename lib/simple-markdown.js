// Simple markdown renderer
const SimpleMarkdown = {
    parse: function(markdown) {
        let html = markdown;
        
        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Lists - handle each list item individually
        const lines = html.split('\n');
        let inList = false;
        let result = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.match(/^- (.*$)/)) {
                if (!inList) {
                    result.push('<ul>');
                    inList = true;
                }
                result.push('<li>' + line.substring(2) + '</li>');
            } else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                result.push(line);
            }
        }
        if (inList) {
            result.push('</ul>');
        }
        html = result.join('\n');
        
        // Code blocks - handle multiple blocks correctly
        html = html.replace(/```([\s\S]*?)```/g, function(match, code) {
            return '<pre><code>' + code.trim() + '</code></pre>';
        });
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Paragraphs
        html = html.split('\n\n').map(para => {
            if (!para.startsWith('<h') && !para.startsWith('<ul') && 
                !para.startsWith('<pre') && para.trim() !== '') {
                return '<p>' + para + '</p>';
            }
            return para;
        }).join('\n');
        
        return html;
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.SimpleMarkdown = SimpleMarkdown;
}
