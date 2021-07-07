document.addEventListener('DOMContentLoaded', function() {
    
    const submitForm = document.getElementById('inputBook');
    
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });
    
    if (isStorageExist()) {
        loadData();
    }
});
    
document.addEventListener('ondataloaded', function() {
    refreshData();
});