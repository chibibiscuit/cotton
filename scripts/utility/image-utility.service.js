var imageUtilityService = new function(){
    var imgDownload;

    this.loadImage = function(imgUrl, imgElement, async){
        var promise = new Promise(function (resolve, reject) {
            if (imgDownload && !imgDownload.async) { 
                imgDownload.onload = null; //if not loading multiple images asynchronously, cancel previous request
            }

            imgDownload = new Image();
            imgDownload.async = async;

            imgElement.style.opacity = imgElement.src ? 0.3 : 0; //hide images that haven't loaded, fade existing images when loading if src exists

            imgDownload.src = imgUrl;
            imgDownload.onload = function (){
                if (this.width + this.height === 0){
                    this.onerror();
                    return;
                }

                imgElement.src = this.src;
                imgElement.style.opacity = 1;
                resolve();
            }

            imgDownload.onerror = function (){
                reject(Error('There was a problem loading the image.'));
            }
        });

        return promise;
    }

    this.loadCurrentImageModal = function(){
        imageUtilityService.loadImage(
            flickrService.getImageUrl(window.imgHash[window.currentImage], 2),
            document.getElementById('modal-img-element')
        ).catch(toast.error);

        document.getElementById('modal-img-title').innerText = window.imgHash[window.currentImage].title;
    }
}