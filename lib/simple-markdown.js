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
        
        // Lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Code blocks
        html = html.replace(/```([^`]*)```/g, '<pre><code>$1</code></pre>');
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Paragraphs
        html = html.split('\n\n').map(para => {
            if (!para.startsWith('<h') && !para.startsWith('<ul') && 
                !para.startsWith('<pre') && !para.startsWith('<li')) {
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
