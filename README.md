# Rocketchat Link Creation Tool

## Introduction:

This tool allows you to create a Rocketchat link using [MARKDOWN](https://rocket.chat/docs/contributing/documentation/markdown-styleguide/) and include metadata of the page (actually the document.title attribute) in your message all at once with no time losing.

## Bookmarklet Installation:

1. Add a new bookmark in the bookmark bar of your browser
2. Pick a name like "Export to rocketchat" or something like that
3. Paste the code above in the URL part of the bookmark creation form
4. Save the bookmark in your bookmark bar

## One-Click Server:

You only need the server if you want to use the one-click feature of this bookmarklet otherwise you can use the bookmarklet to manually copy paste the markdown code into rocketchat or any other chat program.

### Pre-requisites:

1. curl command
2. base64 command
3. nodejs 6 or superior

### Configuration / Installation:

1. Copy the credentials example file:

```console
cp credentials.conf.example credentials.conf
nano credentials.conf
```
2. Edit the credential.conf file and [setup your credentials](https://docs.rocket.chat/developer-guides/rest-api/personal-access-tokens/):

* rocketChatUrl = RocketChat server URL (for example it could be https://rocketchat.yourserver.com) 
* userId = your rocketchat obtained user id
* token = your rocketchat obtained token 

3. Run this command to start the server on every login:

```console
echo "$HOME/rocketchat-linker/runServer.sh" >> $HOME/.profile
```
4. Restart your GNOME UI

## Usage:

1. Click on the bookmark you've created on install
2. If the aforementioned server is running in your PC you will be prompted to imput the destination cannel (prepend @ for people, # for public channels or nothing for private channels) else continue following the instructions
3. Copy the text (if you're using chrome, it's already copied)
4. Paste it on rocket

## This is the code of the bookmarklet:

```javascript
javascript: (function () {
    var url = "http://localhost:9838";
    var defaultChannelName = "default-channel-name";
    if (window.documentWasReplaced) {
        exit(document.getElementById('RocketchatLinkerTextArea'));
        return;
    }
    window.onKeyUp = function (event) {
        if (event.which === 27) {
            exit(event.target);
        }
    };

    function exit(element) {
        document.body.removeChild(element);
        window.documentWasReplaced = false;
    }

    function ping(reqListener) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("OPTIONS", url);
        oReq.send();
    };

    function sendMessage(message, channelName, reqListener) {
        var data = {"channel":channelName, "text":message};
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("POST", url);
        oReq.setRequestHeader("Content-Type", "application/json");
        oReq.send(JSON.stringify(data));
    };

    function init() {
        window.scrollTo(0, 0);
        window.documentWasReplaced = true;
        var newTextarea = document.createElement('textarea');
        newTextarea.setAttribute('id', 'RocketchatLinkerTextArea');
        newTextarea.style['font-weight'] = 'bold';
        newTextarea.style['min-height'] = '300px';
        newTextarea.style['width'] = '100%';
        newTextarea.style['height'] = '100%';
        newTextarea.style['z-index'] = '99999999';
        newTextarea.style['position'] = 'absolute';
        newTextarea.style['left'] = '0';
        newTextarea.style['top'] = '0';
        newTextarea.addEventListener('keyup', window.onKeyUp);
        var innerText = '*[' + document.URL + '](' + document.URL + ')*\n>' + document.title;
        var bottomText = 'Please copy this press ESCAPE to return to your page and paste it on Rocketchat';
        var fullText = innerText + '\n\n\n' + bottomText;
        newTextarea.innerHTML = fullText;
        document.body.appendChild(newTextarea);
        newTextarea.selectionStart = 0;
        newTextarea.selectionEnd = innerText.length;
        newTextarea.focus();
        ping(function() {
            window.defaultChannelName = window.defaultChannelName ? window.defaultChannelName : defaultChannelName;
            var channelName = prompt("Please input the destination channel name:", window.defaultChannelName);
            window.defaultChannelName = channelName;
            sendMessage(innerText, channelName, function(data) {
                exit(newTextarea);
            });
        });
        document.execCommand("copy");
    }
    init();
})();
```
 
## This is the minified version of the bookmarklet

```javascript
javascript:(function()%7Bjavascript%3A%20(function%20()%20%7B%0A%20%20%20%20var%20url%20%3D%20%22http%3A%2F%2Flocalhost%3A9838%22%3B%0A%20%20%20%20var%20defaultChannelName%20%3D%20%22default-channel-name%22%3B%0A%20%20%20%20if%20(window.documentWasReplaced)%20%7B%0A%20%20%20%20%20%20%20%20exit(document.getElementById('RocketchatLinkerTextArea'))%3B%0A%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20window.onKeyUp%20%3D%20function%20(event)%20%7B%0A%20%20%20%20%20%20%20%20if%20(event.which%20%3D%3D%3D%2027)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20exit(event.target)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20function%20exit(element)%20%7B%0A%20%20%20%20%20%20%20%20document.body.removeChild(element)%3B%0A%20%20%20%20%20%20%20%20window.documentWasReplaced%20%3D%20false%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20function%20ping(reqListener)%20%7B%0A%20%20%20%20%20%20%20%20var%20oReq%20%3D%20new%20XMLHttpRequest()%3B%0A%20%20%20%20%20%20%20%20oReq.addEventListener(%22load%22%2C%20reqListener)%3B%0A%20%20%20%20%20%20%20%20oReq.open(%22OPTIONS%22%2C%20url)%3B%0A%20%20%20%20%20%20%20%20oReq.send()%3B%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20function%20sendMessage(message%2C%20channelName%2C%20reqListener)%20%7B%0A%20%20%20%20%20%20%20%20var%20data%20%3D%20%7B%22channel%22%3AchannelName%2C%20%22text%22%3Amessage%7D%3B%0A%20%20%20%20%20%20%20%20var%20oReq%20%3D%20new%20XMLHttpRequest()%3B%0A%20%20%20%20%20%20%20%20oReq.addEventListener(%22load%22%2C%20reqListener)%3B%0A%20%20%20%20%20%20%20%20oReq.open(%22POST%22%2C%20url)%3B%0A%20%20%20%20%20%20%20%20oReq.setRequestHeader(%22Content-Type%22%2C%20%22application%2Fjson%22)%3B%0A%20%20%20%20%20%20%20%20oReq.send(JSON.stringify(data))%3B%0A%20%20%20%20%7D%3B%0A%0A%20%20%20%20function%20init()%20%7B%0A%20%20%20%20%20%20%20%20window.scrollTo(0%2C%200)%3B%0A%20%20%20%20%20%20%20%20window.documentWasReplaced%20%3D%20true%3B%0A%20%20%20%20%20%20%20%20var%20newTextarea%20%3D%20document.createElement('textarea')%3B%0A%20%20%20%20%20%20%20%20newTextarea.setAttribute('id'%2C%20'RocketchatLinkerTextArea')%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'font-weight'%5D%20%3D%20'bold'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'min-height'%5D%20%3D%20'300px'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'width'%5D%20%3D%20'100%25'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'height'%5D%20%3D%20'100%25'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'z-index'%5D%20%3D%20'99999999'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'position'%5D%20%3D%20'absolute'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'left'%5D%20%3D%20'0'%3B%0A%20%20%20%20%20%20%20%20newTextarea.style%5B'top'%5D%20%3D%20'0'%3B%0A%20%20%20%20%20%20%20%20newTextarea.addEventListener('keyup'%2C%20window.onKeyUp)%3B%0A%20%20%20%20%20%20%20%20var%20innerText%20%3D%20'*%5B'%20%2B%20document.URL%20%2B%20'%5D('%20%2B%20document.URL%20%2B%20')*%5Cn%3E'%20%2B%20document.title%3B%0A%20%20%20%20%20%20%20%20var%20bottomText%20%3D%20'Please%20copy%20this%20press%20ESCAPE%20to%20return%20to%20your%20page%20and%20paste%20it%20on%20Rocketchat'%3B%0A%20%20%20%20%20%20%20%20var%20fullText%20%3D%20innerText%20%2B%20'%5Cn%5Cn%5Cn'%20%2B%20bottomText%3B%0A%20%20%20%20%20%20%20%20newTextarea.innerHTML%20%3D%20fullText%3B%0A%20%20%20%20%20%20%20%20document.body.appendChild(newTextarea)%3B%0A%20%20%20%20%20%20%20%20newTextarea.selectionStart%20%3D%200%3B%0A%20%20%20%20%20%20%20%20newTextarea.selectionEnd%20%3D%20innerText.length%3B%0A%20%20%20%20%20%20%20%20newTextarea.focus()%3B%0A%20%20%20%20%20%20%20%20ping(function()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20window.defaultChannelName%20%3D%20window.defaultChannelName%20%3F%20window.defaultChannelName%20%3A%20defaultChannelName%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20channelName%20%3D%20prompt(%22Please%20input%20the%20destination%20channel%20name%3A%22%2C%20window.defaultChannelName)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20window.defaultChannelName%20%3D%20channelName%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20sendMessage(innerText%2C%20channelName%2C%20function(data)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20exit(newTextarea)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20document.execCommand(%22copy%22)%3B%0A%20%20%20%20%7D%0A%20%20%20%20init()%3B%0A%7D)()%3B%7D)()%3B
```