function hamallax(e){
  

    let runScrollEffect = function(){
      $(".hamallax-section").each(function(){
        var scrollSection = $(this);
        
        var scrollPosition = $(document).scrollTop();
        
        
        var scrollSectionHeight = scrollSection.height();
        var scrollTop = scrollSection.offset().top;
        var windowHeight = $(window).height();
        var scrollPositionEnd = scrollPosition + windowHeight;
        
        var pageStart = 0;
        var pageEnd = $("body").height() - windowHeight;
        
        var pageBottomToSectionTop = scrollTop - windowHeight; // 1
        var pageTopToSectionTop = scrollTop; // 2
        var pageBottomToSectionBottom = (scrollTop + scrollSectionHeight) - windowHeight; // 3
        var pageTopToSectionBottom = scrollTop + scrollSectionHeight; // 4
        
        
        
        
        if(numberInRange(scrollPosition, pageBottomToSectionTop, pageTopToSectionBottom)) {
          
          var distance = scrollSection.hasClass("hamallax-clipped") ?
            pageBottomToSectionBottom - pageTopToSectionTop :
            pageTopToSectionBottom - pageBottomToSectionTop;
          var offset = $(this).hasClass("hamallax-clipped") ?
            pageTopToSectionTop :
            pageBottomToSectionTop;
          
          var percentOfPosition = clamp((scrollPosition - offset) / distance,0,2);
          
          
          
            // console.log(offset,distance)
          
          
          scrollSection.addClass("hamallax-onscreen");
          
          if(
            scrollSectionHeight<windowHeight && 
            numberInRange(scrollPosition, pageBottomToSectionBottom, pageTopToSectionTop)) {
            scrollSection
              .addClass("hamallax-inscreen")
              .removeClass("hamallax-overscreen above below");
          } else if(
            scrollSectionHeight>windowHeight && 
            numberInRange(scrollPosition, pageTopToSectionTop, pageBottomToSectionBottom)) {
            scrollSection
              .addClass("hamallax-overscreen")
              .removeClass("hamallax-inscreen above below");
          } else if(numberInRange(scrollPosition, pageBottomToSectionTop, pageTopToSectionTop)) {
            scrollSection
              .addClass("below")
              .removeClass("hamallax-overscreen hamallax-inscreen above");
          } else if(numberInRange(scrollPosition, pageBottomToSectionBottom, pageTopToSectionBottom)) {
            scrollSection
              .addClass("above")
              .removeClass("hamallax-overscreen hamallax-inscreen below");
          }
            
            
            
          scrollSection.find(".hamallax-item").each(function(){
            
            var transform = "",aPosition;
            
            
            // Z movement
            if($(this)[0].hasAttribute("data-scrollz")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollz"),percentOfPosition);
              transform += ` scale(${aPosition},${aPosition}) `;
            }
            // Scale X movement
            if($(this)[0].hasAttribute("data-scrollscalex")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollscalex"),percentOfPosition);
              transform += ` scaleX(${aPosition}) `;
            }
            // Scale Y movement
            if($(this)[0].hasAttribute("data-scrollscaley")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollscaley"),percentOfPosition);
              transform += ` scaleY(${aPosition}) `;
            }
            // X movement
            if($(this)[0].hasAttribute("data-scrollx")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollx"),percentOfPosition) * 2;
              transform += ` translateX(${aPosition}%) `;
            }
            // Y movement
            if($(this)[0].hasAttribute("data-scrolly")) {
              aPosition = runScrollAttribute(""+$(this).data("scrolly"),percentOfPosition) * 2;
              transform += ` translateY(${aPosition}%) `;
            }
            // Rotate Y movement
            if($(this)[0].hasAttribute("data-scrollrotatey")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollrotatey"),percentOfPosition) * 360;
              transform += ` rotateY(${aPosition}deg) `;
            }
            // Rotate X movement
            if($(this)[0].hasAttribute("data-scrollrotatex")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollrotatex"),percentOfPosition) * 360;
              transform += ` rotateX(${aPosition}deg) `;
            }
            // Rotate Z movement
            if($(this)[0].hasAttribute("data-scrollrotatez")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollrotatez"),percentOfPosition) * 360;
              transform += ` rotateZ(${aPosition}deg) `;
            }
            $(this).css({"transform":transform});
            
            // O movement
            if($(this)[0].hasAttribute("data-scrollo")) {
              aPosition = runScrollAttribute(""+$(this).data("scrollo"),percentOfPosition);
              $(this).css({"opacity":aPosition});
            }
            
            
  
          })
        } else if(numberInRange(scrollPosition, pageStart, pageBottomToSectionTop)) {
          scrollSection.addClass("below")
            .removeClass("hamallax-onscreen above");
        } else if(numberInRange(scrollPosition, pageTopToSectionBottom, pageEnd)) {
          scrollSection.addClass("above")
            .removeClass("hamallax-onscreen below");
        }
        
      })
    }
  
  
    let runScrollAttribute = function(str,position){
      
      var l = [], // timeline
          temp, // temp timeline
          pos = 0;
      
      temp = str.trim().split(" ");
      for(let i in temp) {
        let s = temp[i].split(":");
        let obj = {};
        l.push(obj);
        if(s[1]) {
          let t = s[1].split(",");
          obj.timeStart = +t[0];
          obj.timeEnd = +t[1];
        } else {
          obj.timeStart = 0;
          obj.timeEnd = 1;
        }
        let t = s[0].split(",");
        obj.aStart = +t[0];
        if(t[1]!==undefined) obj.aEnd = +t[1];
        else obj.aEnd = +t[0];
  }
  
      if(position >= l[l.length-1].timeEnd) {
        pos = l[l.length-1].aEnd;
      } else if(position <= l[0].timeStart) {
        pos = l[0].aStart;
      } else {
        for(let i in l) {
          if(numberInRange(position,l[i].timeStart,l[i].timeEnd)) {
            let percentOfTime = rangeRatio(position,l[i].timeStart,l[i].timeEnd,0,1);
  
            let distance = l[i].aEnd - l[i].aStart;
            let movement = percentOfTime * distance;
            pos = l[i].aStart + movement;
            break;
          }
        }
      }
      return pos;
    }
  
    let rangeOverlap = (n1,m1,n2,m2) => n1<=m2 && n2<=m1;
    let rangeInRange = (n1,m1,n2,m2) => n1>=n2 && m1<=m2;
    let numberInRange = (n1,n2,m2) => n1>=n2 && n1<=m2;
  
  
    
    runScrollEffect();
    $(document).on("scroll",runScrollEffect);
  }
  
  
  
  
  $(hamallax);