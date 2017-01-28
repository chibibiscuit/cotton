var toast = new function(){
    var toastElement = document.getElementById('toast');
    var toastDuration = 3000;

    this.info = function(message){
        toastElement.className = 'toast toast-info';
        popToast(message);
    }

    this.error = function(message){
        toastElement.className = 'toast toast-error';
        popToast(message);
    }

    function popToast(message){
        toastElement.innerText = message;
        toastElement.style.opacity = 1;

        setTimeout(function(){
            toastElement.style.opacity = 0;
        }, toastDuration)
    }
}