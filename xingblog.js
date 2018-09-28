/*************************************************************************************
 * ������ BEGIN
 *************************************************************************************/
//��� �������� ������
function addImage() {
  var spen_html = '<span class=\'bot\' ></span>\
                         <span class=\'top\'></span>';
  $('.blog_comment_body').append(spen_html);

  $('.blog_comment_body')
    .before('<div class=\'body_right\' style=\'float: left;\'><a target=\'_blank\'><img  /></a></div>');
  var feedbackCon = $('.feedbackCon').addClass('clearfix');
  for (var i = 0; i < feedbackCon.length; i++) {
    var span = $(feedbackCon[i]).find('span:last')[0].innerHTML || 'http://pic.cnitblog.com/face/sample_face.gif';
    $(feedbackCon[i]).find('.body_right img').attr('src', span);
    var href = $(feedbackCon[i]).parent().find('.comment_date').next().attr('href');
    $(feedbackCon[i]).find('.body_right a').attr('href', href);

  }
}
//�ƶ�һ����λ ����
function nextRecTop() {
  var rec = $('#RecentCommentsBlock');
  if (rec.length) {
    var top = rec.scrollTop();
    top++;
    rec.scrollTop(top);
    if (top != rec.scrollTop())
      rec.scrollTop(0);
  }
}
//�ƶ�����
function MobileComment() {
  var RecCommentTime = 80;
  var RecintervalId = setInterval(function () {
    nextRecTop();
  }, RecCommentTime);

  $('#RecentCommentsBlock').hover(function () {//�ƽ�
    clearInterval(RecintervalId);
  }, function () {//�Ƴ�
    RecintervalId = setInterval(function () {
      nextRecTop();
    }, RecCommentTime);
  });
}

//��������� ����
function addtbCommentBody_bg() {
  var tbcomment = $('#tbCommentBody');
  if (!tbcomment.hasClass('tbCommentBody_bg')) {
    tbcomment.addClass('tbCommentBody_bg');
    tbcomment.focus(function () {
      removetbCommentBody_bg();
    });
  }
}

function focusoutCommentBody_bg() {
  $('#tbCommentBody').focusout(function () { addtbCommentBody_bg(); });
}
//�Ƴ������� ����
function removetbCommentBody_bg() {
  !$('.tbCommentBody_bg').removeClass('tbCommentBody_bg');
  $('#tbCommentBody').unbind('focus');
}
/*************************************************************************************
 * ������ END
 *************************************************************************************/

/*************************************************************************************
 * ���������б����Զ�����Ŀ¼ BEGIN
 *************************************************************************************/
String.prototype.replaceAll = function (FindText, RepText) {
  regExp = new RegExp(FindText, 'gm');
  return this.replace(regExp, RepText);
}

/**
 * resolve the string to fit cnblog's rules
 */
function resolveTitle(title) {
  var result;
  result = title.replaceAll(' ', '-');
  result = result.replaceAll('\\(', '');
  result = result.replaceAll('\\)', '');
  result = result.replaceAll('��', '');
  result = result.replaceAll('��', '');
  result = result.toLowerCase();
  return result;
}
function GenerateContentList() {
  var nodes = $('#cnblogs_post_body :header');

  var content = '<a name="_labelTop"></a>';
  content += '<div id="navCategory">';
  content += '<blockquote><p style="font-size: 18pt; color:#a2b4ba"><b>Ŀ¼</b></p>';
  content += '<div>';

  for (var i = 0; i < nodes.length; i++) {
    var item = '';
    var originTitle = $(nodes[i]).text();
    var resolvedTitle = resolveTitle(originTitle);

    if (nodes[i].tagName === 'H1') {
      item = '<a style="font-size:18px" href="#' + resolvedTitle + '">' + $(nodes[i]).text() + '</a><br>';
    } else if (nodes[i].tagName === 'H2') {
      item = '<a style="font-size:16px" href="#' + resolvedTitle + '">&emsp;&emsp;' + $(nodes[i]).text() + '</a><br>';
    }

    content += item;
  }
  content += '</blockquote></div>';
  var len = $('#cnblogs_post_body').length;
  if ($('#cnblogs_post_body').length != 0) {
    $($('#cnblogs_post_body')[0]).prepend(content);
  }

  $($('#cnblogs_post_body')[len - 1])
    .append('<div id=\'signature\'><p>���ߣ�<a href=\'https://www.cnblogs.com/Eternally-dream/\'>Eternally_dream</a></br>��ӭ�κ���ʽ��ת�أ��������ע��������</br>���ڱ���ˮƽ��������ºʹ����б�������֮�������벻�ߴͽ̡�</p></div>');
}
/*************************************************************************************
 * ���������б����Զ�����Ŀ¼ END
 *************************************************************************************/

function generateTagClouds() {
  $('.catListTag>ul').wrap('<div class=\'wrap\' ></div>').parent().css({ 'width': '240px', 'height': '240px' });

  var options = {
    'range': [-200, 300],
    'gravity': -10,
    'xPos': 0.5,
    'yPos': 0.5,
    'gravityVector': [0, 0, 1],
    'interval': 100,
    'hoverGravityFactor': 0
  };

  $('div.wrap').starfieldTagCloud(options);
}

// �Զ��嶨ʱ��[��Ԫ�ؼ��������ִ�лص�����]
function customTimer(inpId, fn) {
  if ($(inpId).length) {
    fn();
  }
  else {
    var intervalId = setInterval(function () {
      if ($(inpId).length) {  //���������
        clearInterval(intervalId);  // ��رն�ʱ��
        customTimer(inpId, fn);              //ִ������
      }
    }, 100);
  }
}

// execute the func after the page have loaded
$(function () {
  customTimer('#div_digg', function () {
    var div_html = '<div class=\'\'>\
                        <a href=\'javascript:void(0);\' onclick=\'c_follow();\'>��ע</a>\
                         &nbsp;|&nbsp;\
                        <a href=\'#top\'>����</a>\
                         &nbsp;|&nbsp;\
                        <a href=\'javascript:void(0);\' onclick=" $(\'#tbCommentBody\').focus();">����</a>\
                   </div>';
    $('#div_digg').append(div_html);
    //tbCommentBody
  });

  GenerateContentList();

  customTimer('.catListTag', generateTagClouds);

  //��� �������� ������
  MobileComment();//�ƶ�����
  customTimer('.blog_comment_body', addImage);
  customTimer('#tbCommentBody', function () {
    addtbCommentBody_bg();
    focusoutCommentBody_bg();
  });
});