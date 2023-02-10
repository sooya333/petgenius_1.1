
$(document).ready(function(){

    show_cmt(num)
    processkey();
});

//댓글 닉네임 + 내용 모두 작성할 경우에만 save 버튼 클릭
$('#name').on('input', processkey);
$('#comment').on('input', processkey);
function processkey() {
    if ($('#name').val() == '' || $('#comment').val() == '') {
        $('#submitButton').attr("disabled", true);
    } else {
        $('#submitButton').attr("disabled", false);
    }
}

// 기록된 댓글들 불러오는 함수
//채원님 detail 페이지에서 값 가져오기(합치기)
function show_cmt(num){
    //$('#names-q1').empty()
    $.ajax({
        type: "GET",
        url: "/comments",
        data: {'num':num},
            success: function (response) {
            console.log(response['cmt_list'])
            let rows = response['cmt_list']
            for (let i = 0; i<rows.length; i++) {
                let name = rows[i]['name']
                let comment = rows[i]['comment']
                let datetime = rows[i]['created_date']
                console.log(datetime)

                let temp_html = `<div class="row bg-light mb-1">
                                    <div class="p-3 col-sm-3" style="background-color: #778899;">
                                        <span class="pt-5" style="color: white;">${name}</span>
                                    </div>
                                    <div class="p-3 col-sm-9">
                                        <span>${comment}</span><br>
                                        <small class="float-sm-end" style="color:lightgray;">${datetime}</small>
                                    </div>
                                </div>`
                $('#cmt_box').prepend(temp_html)
            }
        }
    })
}

// 댓글 등록하기 > 추후 게시글 num 넘겨받기
function save_cmt() {
    let b_num = '1'
    let name = $('#name').val();
    let comment = $('#comment').val()

    let today = new Date()
    let date = today.toLocaleDateString()
    let time = today.toLocaleTimeString('en-GB', {hourCycle: 'h23'})
    today = date + " " + time
    console.log(b_num, name, comment, today)
    let value = confirm('댓글을 등록하시겠습니까? 등록 시, 수정&삭제가 어렵습니다.');
    if(value == true) {
        // alert(name, comment, b_num)
        $.ajax({
            type: "POST",
            url: "/comment", // *** 추후 게시글 num도 가져오기!!!! ****ㄴ
            data: {b_num_give : b_num, name_give:name, comment_give:comment, date_give:today}, //저장된 닉네임과 댓글내용 넘기기
            success: function (response) {
                alert(response['msg']) //댓글이 등록되면 완료메세지 보내기
                window.location.reload() //댓글 등록 후 새로고침 시행
                location.href="#dividers"
            }
        })
    } else if (value == false) {
        return ;
    }
}