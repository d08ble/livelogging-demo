// livecomment plugins demo [
// plugin: client.css - CSS <style> tag [
//:= this.frame('client.exec')

console.log("client.css: setup, use frame('client.exec')")
this.onFrame('client.css', '', 'frame', function() {
  var name = 'client.css.frame: '+htmlEscape(this.object.name)
  this.dbgbrk('client.css frame')
  var a = $("style[name='"+name+"']")
  var style = a.length ? a : $('<style type="text/css" name="'+name+'" />').appendTo('head');
  style.html(this.data);
})
// plugin: client.css - CSS <style> tag ]

// plugin: video logo [
//:= this.frame('client.exec')

$("#video-logo").remove()

$('<video width:"200" loop="" muted="" autoplay="" poster="https://cdn.rawgit.com/d08ble/media/master/lc0l.jpg" id="video-logo">'+
'         <source type="video/mp4" src="https://cdn.rawgit.com/d08ble/media/master/lc0l.mp4">'+
'             <source type="video/webm" src="https://cdn.rawgit.com/d08ble/media/master/lc0l.webm">'+
'             <source type="video/ogg" src="https://cdn.rawgit.com/d08ble/media/master/lc0l.ogv">'+
'        </video>'
).appendTo('#menu')

$(".heartbeat").remove()

// plugin: video logo ]
// client.css - video [
//:= this.frame('client.css')

#video-logo {
  width: 200px;
  float: right;
  margin: 7px 0;
  padding-right: 10px;
  max-height: 36px;
}
.selection-mode {
  line-height: 42px;

}
#menu button {

}
// client.css - video ]
// plugin: url iframe preview [
//:= this.frame('client.exec')

// todo: screenshot/dom/api for X-Frame-Options sites
// http://phantomjs.org/screen-capture.html

this.dbgbrk('B000 url iframe preview')

codeOnShow = function ($code) {
  if (!$($code).attr('highlighted')) {
    Prism.highlightElement($code)
    $($code).attr('highlighted', true)
    var $a = $($code).find('a')
    $a.after("<button class='url-iframe-preview-button'>Preview</button>")
    var $buttons = $($code).find('.url-iframe-preview-button')
    $buttons.click(function (e) {
      var $prev = $(e.target).prev()
      var url = $prev.attr('href')
      var $next = $(e.target).next()

      // extract url info 

      var slashslash = url.indexOf("//") + 2
      var domain = url.substring(slashslash, url.indexOf('/', slashslash))

      var isYoutube
      if (domain.indexOf('youtube.com') != -1 ||
        domain.indexOf('youtu.be') != -1)
        isYoutube = 1

      var isBlocked
      if (domain.indexOf('github.com') != -1 ||
        domain.indexOf('facebook.com') != -1 ||
        domain.indexOf('npmjs.com') != -1 ||
        domain.indexOf('reddit.com') != -1 ||
        domain.indexOf('vimeo.com') != -1 ||
        domain.indexOf('medium.com') != -1 ||
        domain.indexOf('ycombinator.com') != -1 ||
        domain.indexOf('twitter.com') != -1)
        isBlocked = 1

      if (isBlocked) {
        if (!$next.is('.url-iframe-noframe')) {
          $(e.target).after("<div class='url-iframe-noframe'>iframe is blocked on this site. Please donate for "+domain+" plugin.</div>")
        }
        else {
          $($next).remove()
        }
        return
      }

      if (!$next.is('iframe')) {
        if (!isYoutube) {
          $(e.target).after("<iframe class='url-iframe-preview-frame' src='"+url+"'></iframe>")
        }
        else {
          var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)
          var id = (match&&match[7].length==11)? match[7] : false
          var t = url.match(/t=(?:(\d+)h)?(?:(\d+)m)?(\d+)s/)
          console.log(id)
          console.log(t)
          var time
          if (t && t[3])
            time = t[3]*1+(t[2]?t[2]:0)*60+(t[1]?t[1]:0)*3600;
          var newurl = 'https://www.youtube.com/embed/'+id
          if (time)
            newurl += '?start=' + time

          var iframe1 = $(e.target).after("<iframe class='url-iframe-preview-frame' src='"+newurl+"' frameborder='0' allowfullscreen></iframe>")
        }
      }
      else {
        $($next).remove()
      }
    })
  }
}
codeOnHide = function ($code) {
  // hide iframe
}
// plugin: url iframe preview ]
// ./iframe.css [
//:= this.frame('client.css')
.url-iframe-preview-button {
  width: 70px;
  background-color: #4285f4;
  border: none;
  margin-left: 20px;
}
.url-iframe-preview-frame {
  width: calc(100% - 40px);
  height: 480px;
  display: block;
  margin-top: 10px;
  background-color: white;
}
.url-iframe-noframe {
  color: red;
  width: calc(100% - 40px);
  height: 80px;
  background-color: black;
}
// ./iframe.css ]
// ga.js [
//:= this.frame('client.exec')
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-72573711-1', 'auto');
  ga('send', 'pageview');
// ga.js ]
// Donate BTC [
//:= this.frame('client.exec')

$('#donate-btc').remove()

var wallets = ['1MD42doXhTjBqczh2iaWtFLjyfdKK836hC',
'15GWbcMEuzhRNW4ivgjPj9d6PLVidS7oMJ',
'1Fy9U2hs7ssc56Xay9fgPzTb82xDjNFJRk',
'1C4vMBdLi2caXNtcp1qjPm6BcEbrgZuMkU',
'1Lj8LGQvBtjYKibR2CQoZeZyPYSVoh2mTr',
'16Z6QYpFYn6nLL5KkyfXAjWzRBRSucCHw8',
'1HH24Vo9Xo1S4qfeDa3YGLjSWeLTBgQDi7',
'17fGCCuc6d6ESj5QDRSBbFgNSa7T6uopHX',
'1PrM24vrrbhfxgBvepan3cfSjkHqsSr7CL',
'17mK6PAvK4XGzejpVuWQdBg9QM1Z61r8Xv']

var wallet = wallets[Math.floor(Math.random()*wallets.length)]
$('<div id="donate-btc">Donate BTC: '+wallet+'</div>').appendTo('#menu')

// Donate BTC ]
// client.css - donate [
//:= this.frame('client.css')

#donate-btc {
  display: inline-block;
  float: right;
  padding-right: 10px;
  color: gold;
  padding-top:18px;
  font-size: small;
}

// client.css - donate ]
// main.css [
//:= this.frame('client.css')

body {
  background-color: #fff;
}
#menu {
  background: #ff6600;
  border-bottom:5px solid #ff9955;
}
.scope-name {
  background-color: rgb(246, 246, 239);
}
#menu button {
  border: none;
  border-radius: 0px;
  background: none;
  color: #fff;
  margin: 0;
}
#menu label {
  background: none;
  color: #fff;
}
#menu input:checked + label {
  background: #f80;
}

// main.css ]
// livecomment plugins demo ]
