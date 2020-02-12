(function(){
    function getImgSize(imgSrc, callback) {
        var newImg = new Image();
    
        newImg.onload = function () {
            if (callback != undefined)
                callback({width: newImg.width, height: newImg.height})
        }
    
        newImg.src = imgSrc;
    }

    function updateParallax() {
        if (!document.getElementsByClassName('article-image').length) return;

        var imageSrc = document.getElementsByClassName('article-image')[0]
                     .style
                      .backgroundImage
                       .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
                        .split(',')[0];
        
        var width;
        var height;

        getImgSize(imageSrc, function (imgSize) {
            height = imgSize.height;
            width = imgSize.width;
            var img = document.getElementsByClassName('article-image')[0];
            var pos = window.scrollY;
            var maxPosition = height - img.clientHeight;
            var yPos = -(window.scrollY / 3);

            var imgRatio = width/height;
            var contRatio = img.clientWidth / img.clientHeight;

            var maxImgHeight = img.clientWidth / imgRatio;
            var maxScroll = maxImgHeight - img.clientHeight;

            if (imgRatio < contRatio) {
                //console.log('breite');
                if (Math.abs(yPos) < maxScroll) {
                    img.style.backgroundPosition = 'center ' + yPos + 'px';
                    img.style.backgroundSize = 'cover';
                }
            } else {
                //console.log("Höhe");
                var factor = (window.scrollY / 11) + 100;
                img.style.backgroundSize = 'auto ' + factor + '%';
                img.style.backgroundPosition = 'center';
            }
        });

        
    };

    function addOpenImages() {
        var images = document.querySelectorAll('.image-gallery-photo');
        
        for (var i = 0; i < images.length; i++) {
            images[i].addEventListener('click', openImage);
        }
    };

    function openImage() {
        var popup = document.createElement('div');
        popup.className = 'photo-popup';
        
        var image = document.createElement('img');
        image.className = 'popup-photo';
        image.src = this.src.replace("klein", "voll");
        image.src = image.src.replace("@1x", "");
        image.src = image.src.replace("@2x", "");

        //image.src = this.src;

        popup.appendChild(image);
        popup.addEventListener('click', closeImage);
        document.body.appendChild(popup);
    };

    function closeImage() {
        document.body.removeChild(document.getElementsByClassName('photo-popup')[0]);
    }

    function fixWelcomeHeight() {
        if (!document.getElementsByClassName('full-screen-welcome').length) return;
        //console.log(screen.orientation);
        //alert(window.innerHeight);
        //alert(document.documentElement.clientHeight);
        //alert(window.orientation);
        /*switch(screen.orientation.angle) {
            case -90 || 90:
                var height = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                console.log("height " + height);
                break;
            default:
                height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                console.log("height " + height);
                break;
        }*/
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight);
        document.getElementsByClassName('full-screen-welcome')[0].style.height = height - 64 + 'px';
    }

    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    window.addEventListener('DOMContentLoaded', addOpenImages);
    window.addEventListener('DOMContentLoaded', fixWelcomeHeight);
   // window.addEventListener('resize', fixWelcomeHeight);

    window.addEventListener('orientationchange', function() {
        var afterOrientationChange = function() {
            fixWelcomeHeight();
            window.removeEventListener('resize', afterOrientationChange);
        };
        window.addEventListener('resize', afterOrientationChange);
    });
})();

