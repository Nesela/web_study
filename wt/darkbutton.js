let hflinkgs ={
        setcolor:function (color){
    //     var alist = document.querySelectorAll('a');
    // let i = 0 ;
    // while (i < alist.length) {
    // alist[i].style.color = color;
    //     i = i + 1;
    // }
            $('a').css('color', color);
    }
    }
    
    let Body = {
        setcolor:function (color){
        // document.querySelector('body').style.color = color;
        $('body').css('color', color);
    },
        setbackgroundcolor:function (color){
        // document.querySelector('body').style.backgroundColor = color;
        $('body').css('backgroundColor' , color);
    },
    }
    
    function darkbutton(self){
        
    let target = document.querySelector('body');
    if(self.value === '다크모드'){
        Body.setbackgroundcolor('black');
        Body.setcolor('white');
        self.value = '다크모드 끄기';
        hflinkgs.setcolor('tomato');

    } else {
        Body.setbackgroundcolor('white');
        Body.setcolor('black');
        self.value = '다크모드';
        hflinkgs.setcolor('black');
    }
    }