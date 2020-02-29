// ==UserScript==
// @name           Friend For Sale Utility
// @description    Complete utility for Friends For Sale (stats, charts, autowork, page cleaner, pics monitor, numbered pets, buy shortcut ...) 
// @include        http://apps.facebook.com/friendsforsale/users/show*
// @include        http://apps.facebook.com/friendsforsale/chores*
// @include        http://apps.facebook.com/friendsforsale/
// @include        http://apps.facebook.com/friendsforsale/?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @run-at         document-end
// @implementation thewhiteninja
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////

var DEBUG                 = true;        // Logs, not for you
var BENCH                 = true;        // Bench
var PIC_MONITOR           = true;        // Monitor all your pet pics and show old pics
var PET_TYPE_IN_TITLE     = true;        // Display the pet's type (hot, profit, active, inactive)
var AFFORDABLE_PET        = true;        // Change background color if you can buy this pet
var STATS_NUMBER          = true;        // Add detailed stats
var STATS_GRAPH           = true;        // Add detailed charts
var PET_NUMBER            = true;        // Number the pets so that you can find count them easily
var HIDESHOW              = true;        // Hide/Show gifts, achievements, about, graphs
var BUY_SHORTCUT          = true;        // Buy pets quickly
var AUTO_WORK             = true;        // Auto work :)
var PAGE_CLEANER          = true;        // Remove ads and others useless things

var AFFORDABLE_PET_COLOR = '#D7F7FF';
var NEW_PIC_BORDER_COLOR = '#FFF7D7';
var DELAY_AUTO_WORK_MIN  = 7;
var DELAY_AUTO_WORK_MAX  = 7;
var showimage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHTSURBVDhPdVJpT8JAEK3fiMdvMPEn+FuNMTEag7fGC0UFFQS5FCW0QFsPtBIuSwsFLKcBXxmyEBPnQ7s7+97bmbcz0e/3ubFI8n7TbLRaLeRsNtvU1OTMzPTs3PwIAgJFSri7D7uUj2fDqPwMAov3tBTwnSbivmIuRTCOfrIYe3tNdjodxmcLJGWJTyYechl+SBATgRfZ2vwXuC32GLoPXQ4JoYDzDxQVs0yv12u325qmnRzZLQLkX5+FcQLrj5LdbrfRaFSr1VDQ8xB2cdGIW9dV6pI5xhZINpvNWq1WLpdlKXXh3OH8tw5NUw3DwBlps9toa5omTkulUibzubu9zHmuDomQGwQOKpUKCqjX64DiQeCSruvFYjGbzdrXFkY35PN5kgQIXQJHW+RVVYWWonxsbSxZPdANkMGXQHCGoUFAgCDw8YP9VcslSYwBijLwZRzSZmgQrq+c7ss9q0Wf9+R7ECgDBKqNoUk+nU5v2BefotcWAQOXEKIwG/ZRbSgaXZINFJCHp8OX/sqnBD7yGA0CBJcKhcI4VFEUr8fldjniMe9o+LCKBC/OHJuRsF+WxMwgZFm889/AmfOz7dHj/JkizNXp8TpAqHh/dwVQCI1jfgH1tX1/1NHLqQAAAABJRU5ErkJggg%3D%3D';
var loading   = 'data:image/gif;base64,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';
var newpic    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAiCAYAAAAkjjtxAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAO1SURBVHja1FhdSBRRFL6OSxqYrdHDQvtQ4INGD2sI2z+RFFlJoARiEFmCkhBCIkWFYPbSig+BGBEYRPuUBIW9SIIkLIFloGTBkiEKS4U/JbSKSee7O2cZp5ltdr2b24HDdWbHO9/97nd+7mS98m2YE0JsFplvP8mbXOmaPde7Q47RqQkV02GSM+RvtHSAzSveLXyPQ8J7vlnFdH3kpQCLi7QAXv4xK1z5BcJTVSfHFO0XeSv5KfIZvqkMsBEgZBDpfSDve6oupjLdV/Jy8jbzD5oqsLvuvRCFN7rkCP1OPeyIAa6sS3a6kC6BfqsflQBe/j5LPrdKvxjBMsCDeYfWTX6YfNLugTUB9tY2S2AwlsDC+Fs5Ft0Jirydsd+2Hq1ykrLOkl8iX0r0oLYWsNsv35YSAIPf+nuldl2bCsRwRbGYez0QX4zbf0S6jYV1CQSdvDf7gif7KtJmMnrVcjYSkyP0t1vkl+wXWw6dFCtLUcku2IxOT4hPgSvynttfJtn/0hcUK4tR83RPyY+TTzt9f1YylQ56xFbD3tXs1bNAHTHdLhcCVsEkxrGG8rimWSamlNVC3pnszjqWBJhDMOVuowzQ0xG/D/bGGk5IULztGFkOFmAjemB1piJFzalewSy2GuDAIK65/AIUGOeF4BrPWtggeQn5UMop1IkMuMQisGClz8elBDjQ2D7fvU6LeSkXZGEB8mu6HFK2hBoGKORY6BRFgQ0gP7TUSCa59OI5G1tAyjowsvhsqCRnzTlfSyQDMMkFwKhbBstFggPRwkYhAYBV1QJof0thhTe75Bjb7thW4x4WhByM1DbVE7D6d6zCT2DDKhurVZKAXlFieXvBHLIDtApWAVxmCkOwIQhNckClaiKg3eaXKZUEp609gxEJFLoFq1wMwCiAAThGyASZwQQWPcBBK7DKGfYFQ/HcaTQEGDMKsGAb1xYnCXRX1QR2xu5lShkO32qMswVmEWRGsFK7lCmwKAuwbQT0WCKwyoMOWx9ub4xlCMq7YHK4okiyiu3HYmTeXV0QALCcgLb+q5PoH3mYuzBzQHFONhjOWJUEdtLpy9KShyEFMImtNxYLE9j75PuSAavsKGbZoJI0oF24iVk02vUE9NF6fZxw2R15oF1TcIV1CYyu59cU2+bHBBal9Rz5vAodpq00650VOqzTAJsJ36sStZcR/WA4kEkf2OwAo8GuTuastZ6SwNGlLBPBMsPzeuFAo11L/kRksLEk3iNlkX8UGW4aN9r/A1jYbwEGAONStfx4V4ctAAAAAElFTkSuQmCC';
var debugpic  = 'data:image/gif;base64,R0lGODlhZACFAIAAAAAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENEOTdCNDFFN0I3MTFERjk3MzhBQzlEREIyMUU1REMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENEOTdCNDJFN0I3MTFERjk3MzhBQzlEREIyMUU1REMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0Q5N0IzRkU3QjcxMURGOTczOEFDOUREQjIxRTVEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0Q5N0I0MEU3QjcxMURGOTczOEFDOUREQjIxRTVEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAABkAIUAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvXR4D7DX8b4nTAQj6vx2f6faCPd+D3B+gmU4iHKEiXpwiDaEgIuMgIaWczSBl5l5nQiQmn8Kl5yTDKF+qZyhnIuonzWUhaKroKa9uoh3Aq+Qramlunihu8Ezs57FuscwzsSkvKTMy7O01c06xca+2Mza0d3E39+K3b92xcLqyLLu0su2x6jfqO3Pgwzqa/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8aNEBw7evwIMqTIkSRLmjypowAAOw%3D%3D';

///////////////////////////////////////////////////////////////////////////////

var MAX_CHORES_PET   = 31622.77;
var MAX_CHORES       = 3162277;
var MAX_CHORES_ALL   = 316227700;
var B1               = 1000000000;
var M100             = 100000000;
var M50              = 50000000;
var timeout, accountCash, isMe;

///////////////////////////////////////////////////////////////////////////////

GM_log = function(s) {
	console.log(s);
};

GM_getValue = function(name, defaultValue) {
	var value = localStorage.getItem(name);
	if (!value)
		return defaultValue;
	var type = value[0];
	value = value.substring(1);
	switch (type) {
		case 'b':
			return value == 'true';
		case 'n':
			return Number(value);
		default:
			return value;
	}
};

GM_setValue = function(name, value) {
	value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
};

///////////////////////////////////////////////////////////////////////////////

var logs = new function () {
    this.indent = '';
    this.timeLog = [];

    this.begin = function (f) {
        if (DEBUG) {
            this.timeLog.push(new Date());
            GM_log(this.indent + f + ' {');
            this.indent += '    ';
        }
    };
    
    this.end = function () {
        if (DEBUG) {
            this.indent = this.indent.substring(0, this.indent.length - 4);
            GM_log(this.indent + '} ' + (new Date() - this.timeLog.pop())+ 'ms');
        }
    };
    
    this.write = function (t) {
        if (DEBUG) { GM_log(this.indent + t); }
    };
};

///////////////////////////////////////////////////////////////////////////////

function removecommas(txt) {
    return parseInt(txt.substring(1).replace(/,/g,''), 10);
}

function addcommas(num) {
    var txt = String(Math.floor(num));
    for(var i=txt.length - 3, s = ''; i>0; i=i - 3){
        s = ',' + txt.substr(i,3) + s;
    }
    return '$' + txt.substring(0, 3 + i) + s;
}

function performClick(node) {
    logs.begin(arguments.callee.name);
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, false);
    node.dispatchEvent(evt);
    logs.end();
}

function buyTimes(accountCash, value, ownerCash){
    if ((value>=B1) && (accountCash >= value + M100)){
        return 0.5 + buyTimes(ownerCash + value + M50, value + M100, accountCash - (value + M100));
    }else if ((value<B1) && (accountCash >= value * 1.111)){
        return 0.5 + buyTimes(ownerCash + value * 1.05, value * 1.1, accountCash - value * 1.111);
    }else{
        return 0.0;
    }
}

function canBuy(accountCash, petvalue){
    return buyTimes(accountCash, petvalue, 0);
}

function extendedEncode(arrVals, maxVal) {
    var EXTENDED_MAP='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
    var EXTENDED_MAP_LENGTH = EXTENDED_MAP.length;
    var chartData = '';
    for(i = 0, len = arrVals.length; i < len; i++) {
        var numericVal = arrVals[i];
        var scaledVal = Math.floor(EXTENDED_MAP_LENGTH *
        EXTENDED_MAP_LENGTH * numericVal / maxVal);
        if(scaledVal > (EXTENDED_MAP_LENGTH * EXTENDED_MAP_LENGTH) - 1) {
            chartData += '..';
        } else if (scaledVal < 0) {
            chartData += '__';
        } else {
            var quotient = Math.floor(scaledVal / EXTENDED_MAP_LENGTH);
            var remainder = scaledVal - EXTENDED_MAP_LENGTH * quotient;
            chartData += EXTENDED_MAP.charAt(quotient) + EXTENDED_MAP.charAt(remainder);
        }
    }
    return chartData;
}

function extractGetParam(param){
    var begin, end, url = window.location.href;
    if ((begin = url.indexOf(param)) != -1){
        if ((end = url.indexOf('&', begin + param.length)) != -1) { return url.substring(begin + param.length + 1, end); }
        else { return url.substring(begin + param.length + 1); }
    }else { return null; }    
}

function swapAttr(s1, attr1, s2, attr2){       
    var tmp = $(s1).attr(attr1);
    $(s1).attr(attr1, $(s2).attr(attr2));
    $(s2).attr(attr2, tmp);
}

Array.prototype.chores = function() {
    for (var i = 0, L = this.length, chores = 0; i < L; chores += Math.min(Math.sqrt(this[i++]), MAX_CHORES_PET)) {}
    return Math.floor(100 * chores);
};

Array.prototype.sum = function() {
    for (var i = 0, L = this.length, sum = 0; i < L; sum += this[i++]) {};
    return sum;
};

Array.prototype.sortDec = function() {
    this.sort(function (a,b) {return b - a;});
};

Array.prototype.last = function(val) {
    if (val != undefined) this[this.length-1] = val;
    return this[this.length-1];
};

Array.prototype.first = function(val) {
    if (val != undefined) this[0] = val;
    return this[0];
};

///////////////////////////////////////////////////////////////////////////////

function clean(){
    logs.begin(arguments.callee.name);

    if (HIDESHOW){
        $('div.about > div[style]').hide();
        $('#app7019261521_gift-list').hide();
        $('#app7019261521_achievement-list').hide();

        $('div.about').attr('style', 'cursor:pointer');
        $('div.gifts').attr('style', 'cursor:pointer');
        $('div.achievements').attr('style', 'cursor:pointer;margin-top:44px;');

        $('div.gifts > div.headline').append('<img src="'+showimage+'" style="float:right"></img>');
        $('div.about > div.headline').append('<img src="'+showimage+'" style="float:right"></img>');
        $('div.achievements> div.headline').append('<img src="'+showimage+'" style="float:right"></img>');

        $('div.about').click(function(){
            $('div.about > div[style]').slideToggle('fast', function() {
            });
        });
        $('div.gifts').click(function(){
            $('#app7019261521_gift-list').slideToggle('fast', function() {
            });
        });
        $('div.achievements').click(function(){
            $('#app7019261521_achievement-list').slideToggle('fast', function() {
            });
        });
    }

    $('iframe').remove();
    $('#app7019261521_new_get_coins_cta_containter').remove();
    $('div[id$="app7019261521_buy_"]').css('display', 'block');
    $('div.x_action_link a:contains("report")').remove();
	$('#app7019261521_nickname_container div.x_action_link').remove();
    $('div.green_box').remove();
    $('#app7019261521_lock_me').remove();
    $('div.new_tutorial_back_on_track').remove();
    $('#app7019261521_user_selector').remove();
    $('#app7019261521_main_column div:contains("FFS Coins now on sale!")').remove();
    $('div.sliding_window_corner:contains("Ask Friends to Buy You")').remove();
    $('div.welcome div:contains("Featured Gifts")').remove();
    $('div.recent_locks_header').remove();
    $('#app7019261521_recent_locks').remove();
    $('#app7019261521_main_column').css('padding-bottom', '150%');

    logs.end();
}

function updatePets(selector, page){
    var picchanged = 0, index = 1 + 100 * (page===null?0:page-1), allvalues = [];
    $(selector).each(
    function (item) {
        var txt = '';
        var petvalue = removecommas($(this).find('span.money:eq(0)').text());
        buys = canBuy(accountCash, petvalue)
        if (buys && !isMe && AFFORDABLE_PET){
            $(this).parent().parent().parent().css('background-color', AFFORDABLE_PET_COLOR);
        }
        if (PET_NUMBER) { txt += '<li style="margin-top: 5ex; text-align:right">N° <span style="color:#3B5998">' + index + '</span></li>'; index++; }
        if (!isMe && buys && BUY_SHORTCUT){
            var ffsID = $(this).find('li.name a').attr('href');
            ffsID = ffsID.substr(ffsID.indexOf('show/') + 5);
            txt += '<li style="margin-top: 2ex; text-align:right"><a target="_blank" href="http://apps.facebook.com/friendsforsale/users/buy_dialog_user/' + ffsID + '"><span>Buy</span></a></li>';
        }
        $(this).find('ul').append(txt);

        if ((isMe || isMonitored) && PIC_MONITOR){
            var loc = $(this).find('div.photo img');
            var uid = $(loc).attr('uid');
            var url = $(loc).attr('src');
            var oldurl = GM_getValue(uid, 'no');
            if (oldurl == 'no') GM_setValue(uid, url);
            else if ((url != oldurl) || (DEBUG && (Math.random()<0.5))){
                $(loc).addClass('newpic');
                $(loc).before('<img url="' + (DEBUG?debugpic:oldurl) + '" style="position:absolute; left:12px; width:44px" src="' + newpic + '"/>');
                GM_setValue(uid, url);
                picchanged++;
            }
        }            
        allvalues.push(petvalue);
    }
    );
    if (picchanged > 0) $('#app7019261521_side_col_container div.pets > h2').append('<span style="font-size:11px;float:right;margin-right:1em">(<span style="color:#DD3C10">' + picchanged + '</span> pic' + (picchanged==1?'':'s') + ' changed)</span>');
    
    $('img.newpic').mouseenter(
    function(e) {
        swapAttr(e.target, 'src', e.target.previousSibling, 'url');
        $(e.target.previousSibling).hide();
    }             ).mouseleave(
    function(e) {
        swapAttr(e.target, 'src', e.target.previousSibling, 'url');
        $(e.target.previousSibling).show();        
    });
    
    return allvalues;
}

function showStats() {
    logs.begin(arguments.callee.name);
    logs.begin('init');
    
    var infosNet =   $('#app7019261521_user_info_box dl.info dt').eq(4);
    var infosPetsB = $('#app7019261521_user_info_box dl.info dt').eq(5);
    var infosPetsA = $('#app7019261521_user_info_box dl.info dd').eq(5);

    accountCash = removecommas($('span.money:eq(0)').text());
    logs.write('accountCash : ' + addcommas(accountCash));
    var value = removecommas($('span.money:eq(1)').text());
    logs.write('value : ' + addcommas(value));
    var cash = removecommas($('span.money:eq(2)').text());
    logs.write('cash : ' + addcommas(cash));
    var id = $('#app7019261521_user_info_box div.profile_photo img').attr('uid');
    logs.write('uid : ' + id);
    var ownerName = $('#app7019261521_owner-box a').text();
    logs.write('ownerName : ' + ownerName);
    var accountName = $('#navAccountName').text();
    logs.write('accountName : ' + accountName);
    var petName = $('#app7019261521_user_info_box h2 a').text();
    logs.write('petName : ' + petName);
    var buys, i;

    var isMyPet = (ownerName == accountName);
    logs.write('isMyPet : ' + isMyPet);
    isMe = (accountName == petName);
    logs.write('isMe : ' + isMe);
    isMonitored = GM_getValue(id + 'M', false);
    logs.write('isMonitored : ' + isMonitored);
    
    logs.end();
    logs.begin('each pet');
    
    var sum = 0, sumW = 0, allvalues = updatePets('#app7019261521_pet-list li.pets-item div.holder', extractGetParam('pet_page'));
    sumW = allvalues.chores();
    logs.write('chores : ' + addcommas(sumW));
    sum  = allvalues.sum();
    logs.write('petsvalue : ' + addcommas(sum));
    
    logs.end();
    logs.begin('stats');

    var pctInv = 100 * (1-(cash/(sum + cash)));

    if (infosNet.length == 1 && infosPetsB.length == 1 && infosPetsA.length == 1 && STATS_NUMBER) {
        infosNet.before('<dt><span class="label">Pets value:</span></dt><dd><span class="money">' + addcommas(sum) + '</span></dd>');
        infosPetsB.before('<dt><span class="label">Assets:</span></dt><dd><span class="money">' + addcommas(sum + cash) + '</span></dd>');
        
        if(isMyPet){
            infosPetsA.after('<dt><span class="label">If Sold:</span></dt><dd><span class="money"> + '+addcommas((value<B1?Math.floor(value * 0.05):M50)) + '</span></dd>');
            buys = buyTimes(Number.MAX_VALUE, value, accountCash);
            if (Math.floor(buys) > 0){
                var tmpVal = value;
                for(i=0; i<2 * Math.floor(buys);i++){
                    if (tmpVal < B1) { tmpVal *= 1.1; }
                    else { tmpVal += M100; }
                }
                infosPetsA.after('<dt><span class="label">Boucing to:</span></dt><dd><span class="money">'+addcommas(Math.floor(tmpVal))+'</span></dd><dd>&nbsp;</dd><dt>&nbsp;</dt>');
            }
        }else if (!isMe) {
            if (canBuy(accountCash, value)){
                var ownerCash = removecommas($('div.owner span.money:eq(1)').text());
                var ownerLink = $('div.owner div.text p:eq(0)').text();
                buys = buyTimes(accountCash, value, ownerCash);
                infosPetsA.after('<dt>&nbsp;</dt><dd>&nbsp;</dd><dt>&nbsp;</dt><dd>&nbsp;</dd><div style="width:auto"><span class="label">You can buy it <span class="admirers">'+Math.ceil(buys)+'</span> times and '+((ownerLink===null)?'someone':ownerLink)+' <span class="admirers">'+Math.floor(buys)+'</span> times.</div>');
            }else{
                infosPetsA.after('<dt><span class="label">To buy:</span></dt><dd><span class="money" style="color:#602C31">'+addcommas(Math.floor((value<B1?value * 1.111:value+M100) - accountCash))+'</span></dd>');
            }
        }
        infosPetsA.after('<dt><span class="label">Chores:</span></dt><dd><span class="money">'+addcommas(Math.floor(sumW))+'</span></dd><dt><span class="label">Invested:</span></dt><dd><span class="admirers">'+pctInv.toFixed(2)+'%</span></dd>');
    }

    logs.end();

    if (!isMe && PIC_MONITOR){
        $('#app7019261521_user_info_box .general .headline').append('<span class="label" style="float:right;background-color:#FFFFFF;">&nbsp;&nbsp;Monitor pics<input type="checkbox" id="monitor" style="position:relative;top:2px;" '+(isMonitored?'checked="yes"':'')+'></input></span>');
    }

    if (PET_TYPE_IN_TITLE){
        var status, color;
        if (sum === 0 || pctInv === 0) { status = 'Inactive'; color = '#969696'; }
        else if (pctInv > 99)          { status = 'Very Hot'; color = '#FF0000'; }        
        else if (pctInv > 85)          { status = 'Hot';      color = '#FFA000'; }
        else if (pctInv > 60)          { status = 'Profit';   color = '#FFFF00'; }
        else                           { status = 'Active';   color = '#00FF00'; }
        $('#app7019261521_user_info_box h2').append(' <span style="color:#3B5998">(<span style="color:'+color+'">' + status + '</span>)</span>');
    }

    if (STATS_GRAPH){
        logs.begin('graphs');
        var nextchores = [];
        var optimalvalues = [];
        var graphContent = '';
    
        logs.begin('computing');
        nextchores.push(sumW);
        if (sumW < MAX_CHORES_ALL){
            var currentCash = cash;
            var currentValues = allvalues.slice();
            var tmp = Math.min(Math.floor(sum/currentValues.length), B1);
            for (i=0;i<currentValues.length; i++) { optimalvalues.push(tmp); }
            currentValues.sortDec();
            for (i=1;i<30; i++){
                if (currentValues.last()<B1){
                    currentCash += nextchores.last() * 1.44 + 10000000 + (ownerName!==''?144*Math.sqrt(value):0);
                    while (1){
                        buys = buyTimes(Number.MAX_VALUE, currentValues.last(), currentCash);
                        if (Math.floor(buys)>=1){
                            currentCash = currentCash - currentValues.last() * 0.1721;
                            currentValues.last(currentValues.last() * 1.21);
                            currentValues.sortDec();
                        }
                        else { break; }
                    }
                    nextchores.push(currentValues.chores());
                }else { nextchores.push(nextchores.last()); }
            }
        }
        logs.end();

        logs.begin('display');
        var days = nextchores.indexOf(MAX_CHORES_ALL);
        var ref = nextchores.first();
        var maxch = nextchores.last();
        for (i=0;i<nextchores.length; i++) { nextchores[i] = nextchores[i] - ref; }

        graphContent = '<br/><br/><div id="graph" class="gifts" style="margin:0px"><div class="headline" style="cursor:pointer;"><h3 class="has_icon" style="color:#666666; background-position:0px -32px">Stats</h3><img src="'+showimage+'" style="float:right"></img></div><table id="graphcontent" style="width:100%;display:'+(HIDESHOW?'none':'block')+';">';

        graphContent += '<tr><td><center><img src="http://chart.apis.google.com/chart?chxl=0:|Pet|1:|%24&chxp=0,100|1,100&chxt=x,y&chg=5,0,3,3&chs=490x140&cht=lxy&chco=3B5998,2C6031&chd=e:__,'+extendedEncode(allvalues, allvalues[0])+',__,'+extendedEncode(optimalvalues, allvalues[0])+'&chdl=Current+value|Optimal+value&chdlp=l&chls=1|1&chma=0,15,5,5&chtt=Pets+distribution&chts=676767,10.9"></img></center></td></tr>';
        if (optimalvalues.length !== 0) {
            graphContent += '<tr><td><center><span class="label">'+(isMe?'You':'This pet')+' could earn <span class="money">'+addcommas( Math.min( Math.floor(Math.sqrt(sum/allvalues.length)) * 100, MAX_CHORES) * allvalues.length)+'</span> doing chores if all pet\'s value is <span class="money">'+addcommas(Math.min(Math.floor(sum/allvalues.length), B1))+'</span>.</span></center></td></tr>';
        } else if (sumW === 0) {
            graphContent += '<tr><td><center><span class="label">'+(isMe?'You don\'t':'This pet doesn\'t')+' have pets.</span></center></td></tr>';
        } else {
            graphContent += '<tr><td><center><span class="label">'+(isMe?'Your':'Its')+' 100 biggest pets have a value superior or equal to <span class="money">'+addcommas(B1)+'</span>, the best pet value for chores. Congrats !</span></center></td></tr>';
        }

        graphContent += '<tr><td>&nbsp;</td></tr><tr><td><center><img src="http://chart.apis.google.com/chart?chxr=0,0,30|1,'+ref+','+maxch+'&chxs=0,676767,10.5,-1,lt,676767|1,676767,10.5,-1,l,676767&chxtc=0,2|1,2&chxt=x,y&chs=490x140&cht=lxy&chco=3B5998&chd=e:__,'+extendedEncode(nextchores, nextchores[nextchores.length - 1])+'&chdlp=t&chls=1&chma=108,15,5,5|75&chg=0,15,3,3&chm=v,008000,0,1:30,1&chtt=Next+chores&chts=676767,10.9"></img></center></td></tr>';
        if (optimalvalues.length !== 0) {
            graphContent += '<tr><td><center><span class="label">In <span class="info">'+(days==-1?30:days)+'</span> days, '+(isMe?'you':'this pet')+' could earn <span class="money">'+addcommas(Math.floor(maxch))+'</span> doing chores.</span></center></td></tr>';
        } else if (sumW === 0) {
            graphContent += '<tr><td><center><span class="label">'+(isMe?'You':'This pet')+' still don\'t have pets.</span></center></td></tr>';
        } else {
            graphContent += '<tr><td><center><span class="label">'+(isMe?'You':'This pet')+' reach the maximum chores value : <span class="money">'+addcommas(316227700)+'</span>.'+(isMe?'You':'This pet')+' beat the chores system :)</span></center></td></tr>';
        }

        graphContent += '</table><br/><br/></div>';
        $('div.gifts').parent().prepend(graphContent);
        logs.end();

        if (HIDESHOW){
            $('#graph').click(function(){
                $('#graphcontent').slideToggle('fast', function() {
                });
            });
        }
        logs.end();
    }

    logs.end();
}

function work() {
    logs.begin('asynchronous ' + arguments.callee.name);
    var firstPets = $('#app7019261521_pet_energy a');
    if (firstPets.length) {
        var energy = parseInt($('span.energy', firstPets[0]).text().match(/([0-9]+)/i)[1], 10);        
        
        var chore;
        if (energy == 100)        { chore = 0; }
        else if (energy >= 75)    { chore = 4; }
        else if (energy >= 65)    { chore = 9; }
        else if (energy >= 50)    { chore = 6; }
        else if (energy >= 40)    { chore = 11;}
        else if (energy >= 35)    { chore = 2; }
        else if (energy >= 30)    { chore = 7; }
        else if (energy >= 25)    { chore = 5; }
        else if (energy >= 15)    { chore = 1; }
        else                      { chore = 3; }

        performClick(firstPets[0]);

        var w = $('#app7019261521_chore_box span.chore_container:eq(' + chore + ') a');
        performClick(w[0]);

        var friend = $('#app7019261521_all_friends span a');
        performClick(friend[0]);

        var action = $('#app7019261521_chore_submit');
        performClick(action[0]);
    }
    logs.end();
}

///////////////////////////////////////////////////////////////////////////////

function addUIChores(){
    logs.begin(arguments.callee.name);
    var chores_autostart = GM_getValue('chores_autostart', false);
    var chores_running   = GM_getValue('chores_start_running', false);
    logs.write('chores_running : ' + chores_running);
    var chores_autovalue = GM_getValue('chores_autovalue', '100');
    logs.write('chores_autovalue : ' + chores_autovalue);

    $('#app7019261521_pet_box').append('<div style="padding:5px;margin-top:2ex;border:1px solid #b4b4b4;font-family:lucida grande,tahoma,verdana,arial,sans-serif;color:#666666"><center><span>Energy min</span> <input style="margin-right:1em" type="text" value="'+chores_autovalue+'" size="3" id="chores_autovalue"></input><input type="button" class="inputsubmit" style="margin-right:2em;padding:2px 10px 1px 10px;" id="chores_start" value="'+(GM_getValue('chores_start_running', false)?'Stop':'Start')+'"><input type="checkbox" id="chores_autostart" '+ ((chores_autostart)?'checked="checked" ':'') + '>Autostart</input><img id="loading" style="float:right; display: none; width:20px; margin-right:10px;" src="'+loading+'"/></center></div>');

    if (chores_running){
        $('#loading').show();
        var energy = $('#app7019261521_pet_energy span.energy:eq(0)').text();
        if (energy !== null){
            energy = parseInt(energy.match(/([0-9]+)/i)[1], 10);
            logs.write('energy : '+energy);
            if (energy >= Math.max(chores_autovalue, 10)) {
                timeout = window.setTimeout(work, (Math.random() * (DELAY_AUTO_WORK_MAX - DELAY_AUTO_WORK_MIN)+DELAY_AUTO_WORK_MIN) * 1000);
            }else{
                logs.write('waiting : ' + (100 - energy) * 600000 + 'ms');
                timeout = window.setTimeout(document.location.reload, (100 - energy) * 600000);
            }
        }else{
            document.location.reload();
        }
    }else if (chores_autostart) {
        performClick(document.getElementById('chores_start'));
    }
    logs.end();
}

///////////////////////////////////////////////////////////////////////////////

document.addEventListener('click',
function (event) {
    logs.begin('asynchronous click');
    logs.write('target : ' + (event.target.id===''?event.target.innerHTML.substr(0, 50)+' ...':event.target.id));
    if (event.target.id == 'chores_autostart'){
        GM_setValue(event.target.id, event.target.checked);
        if (event.target.checked && !GM_getValue('chores_start_running', false)) { performClick(document.getElementById('chores_start')); }
    }else if (event.target.id == 'monitor'){
        GM_setValue($('div.profile_photo img').attr('uid') + 'M', event.target.checked);
        if (event.target.checked){
            $('#app7019261521_pet-list li.pets-item div.holder').each(
            function (i) {
                var uid = $(this).find('div.photo img').attr('uid');
                var url = $(this).find('div.photo img').attr('src');
                GM_setValue(uid, url);
            }
            );
        }
    }else if (event.target.id == 'chores_start'){
        if (GM_getValue('chores_start_running', false)) {
            GM_setValue('chores_start_running', false);
            $('#loading').hide();
            event.target.value = 'Start';
            clearTimeout(timeout);
            logs.write('action : stop');
        }else{
            var energy = parseInt($('#app7019261521_pet_energy span.energy:eq(0)').text().match(/([0-9]+)/i)[1], 10);
            logs.write('energy : '+energy);
            logs.write('chores_autovalue : ' + $('#chores_autovalue').val());
            if (energy >= Math.max($('#chores_autovalue').val(), 10)) {
                timeout = window.setTimeout(work, 1000);
            }else{
                logs.write('waiting : ' + (100 - energy) * 600000 + 'ms');
                timeout = window.setTimeout(document.location.reload, (100 - energy) * 600000);
            }
            GM_setValue('chores_start_running', true);
            $('#loading').show();
            event.target.value = 'Stop';
            logs.write('action : start');
        }
    }
    logs.end();
},
false);

document.addEventListener('change',
function (event) {
    if (event.target.id == 'chores_autovalue'){
        logs.begin('asynchronous change');
        var val = event.target.value;
        if (val && isFinite(val)){
            GM_setValue(event.target.id, val);
            logs.write('choresAutovalue : ' + val);
        }
        logs.end();
    }
},
false);

///////////////////////////////////////////////////////////////////////////////

function fix() {
    logs.begin(arguments.callee.name);
    logs.end();
}

function benchmark() {
    logs.begin(arguments.callee.name);
    var i, d, data = [];
    
    function repeat(fn, times) {
        var start = new Date(), endname = fn.indexOf('('), startname = fn.indexOf('.');
        while (times--) { eval(fn); } 
        logs.write(fn.substring((startname>endname?0:startname+1),endname) + ' : ' + (new Date() - start) + 'ms');    
    }
    
    for(i=0; i<100; i++){ data.push(Math.random() * B1); }
    
    repeat('addcommas(Math.random() * B1)', 1000);
    repeat('removecommas(addcommas(Math.random() * B1))', 1000);
    repeat('data.chores()', 1000);
    repeat('buyTimes(Math.random() * B1, Math.random() * B1, Math.random() * B1)', 1000);
    repeat('extendedEncode(data, B1)', 1000);
    
    logs.end();
}

function start(){
    logs.begin(arguments.callee.name);
    if (window.location.href.indexOf('chores') !== -1) {
        if (AUTO_WORK) { addUIChores(); }
    }else{
        if (PAGE_CLEANER) { clean(); }
        showStats();
    }
    logs.end();
}

function require_jQuery() {
    if ($ == undefined) {
        document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
        script.async = true;
        document.body.appendChild(script);
    }
    function wait() {
        if ($ == undefined) {
            window.setTimeout(wait, 100);
        } else { main(); }
    }
    wait();
}

///////////////////////////////////////////////////////////////////////////////

require_jQuery();

function main(){
	if (DEBUG && BENCH) { benchmark(); }

	fix();
	start();
}
