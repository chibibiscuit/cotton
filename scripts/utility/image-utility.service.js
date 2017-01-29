var imageUtilityService = new function(){
    var imgDownload;

    this.loadImage = function(imgUrl, imgElement, async){
        if (imgDownload && !imgDownload.async) { imgDownload.onload = null } //if not loading multiple images asynchronously, cancel previous request

        imgDownload = new Image();
        imgDownload.async = async;

        imgElement.src = '';
        imgElement.style.opacity = 0;

        imgDownload.src = imgUrl;
        imgDownload.onload = function (){
            imgElement.src = this.src;
            imgElement.style.opacity = 1;
        }
    }
}