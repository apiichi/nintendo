//공통
$(function() {
	//---변수 선언부---
	//header
	const $gnb = $('#gnb > li')
	const $sub = $('#gnb .gnb-sub')
	const $notice = $('.notice > ul > li ')
	const $mnu = $('.sect-mnu>ul > li > a')
	const $srchBox = $('fieldset')
	//section
	const $mv = $('.main_visual .slide-container')
	const $mv_nowPag = $('.main_visual .slide-navi span')

	//기타
	let nowIdx = 0
	let intervalId = null

	// ---함수선언부---
	//메인비주얼 가로이동 함수
	const bnrMoveFn = function() {
		 $mv.stop().animate(
				{
					 left: -100 * nowIdx + '%'
				},
				1000
		 )
		 $mv_nowPag.text(nowIdx + 1)
	}

	// 다음 인덱스 함수
	const nextIdx = function() {
		 if (nowIdx < 7) {
				nowIdx++
		 } else {
				nowIdx = 0
		 }
	}

	// 자동재생 함수
	const autoPlay = function() {
		 clearInterval(intervalId)
		 intervalId = setInterval(function() {
				nextIdx()
				bnrMoveFn()
		 }, 4000)
	}

	// ---이벤트 등록---
	//검색버튼 - 검색창 슬라이드다운(나타남)
	$('.search').on('click', function(evt) {
		 evt.preventDefault()
		 $srchBox.stop().slideDown(200)
	})

	//검색 닫기 버튼 - 검색창 슬라이드업(사라짐)
	$('header fieldset > .btn-clse').on('click', function(evt) {
		 $srchBox.stop().slideUp(200)
	})

	//메인비주얼 - 이전버튼
	$('.main_visual .slide-prev').on('click', function(evt) {
		 evt.preventDefault()
		 if (nowIdx > 0) {
				nowIdx--
		 } else {
				nowIdx = 7
		 }
		 bnrMoveFn()
	})

	//메인비주얼 - 다음버튼
	$('.main_visual .slide-next').on('click', function(evt) {
		 evt.preventDefault()
		 nextIdx()
		 bnrMoveFn()
	})

	// ---초기화---
	//메인비주얼 자동 슬라이드 실행
	autoPlay()

	$(window).on('load resize', function() {
		 const currentW = $(window).width()

		 //PC만
		 if (currentW > 992) {
				
			//초기화
			$gnb.off('click mouseleave');
			$gnb.parent().show()
			$('.btn-nav').text('메뉴닫힘').addClass('clse')
			//공지가 세로 슬라이드 초기화
			clearInterval(intervalId)

			//gnb:hover - gnb-sub 슬라이드업다운
			$gnb.on({
					mouseenter: function(evt) {
						evt.preventDefault()
						nowIdx = $(this).index()
						$sub.eq(nowIdx).stop().slideDown(300)
					},
					mouseleave: function(evt) {
						$sub.eq(nowIdx).stop().slideUp(200)
					}
			})
			//태블릿+모바일
		 }else{
			//초기화
			$gnb.off('mouseenter mouseleave');
			// $sub.hide()
			$gnb.parent().hide()


			//공지가 자동으로 세로 슬라이드되는 함수
			clearInterval(intervalId)
			intervalId = setInterval(function(){
			if (nowIdx < 1) {
					nowIdx++
				} else {
					nowIdx = 0
			}
			$notice.animate(
				{
					top:  -50 * nowIdx
				},4000)
			},6000)
				


			//btn-nav - gnb 슬라이드업/다운되는 이벤트
			$('.btn-nav').on('click', function(evt) {
				 evt.preventDefault()
				//  $gnb.parent().stop().slideToggle(400)

				//텍스트변경
				if($('.btn-nav').hasClass('clse')){
					$gnb.parent().stop().slideDown(400)
					$('.btn-nav').removeClass('clse').text('메뉴닫기')
				 }else{
					$gnb.parent().stop().slideUp(400)
					$('.btn-nav').text('메뉴열기').addClass('clse')
				}
			})
			
			//gnb -  gnb-sub의 서브 메뉴 나옴
			$gnb.on('click', function(evt) {
				 evt.preventDefault()
				 nowIdx = $(this).index()
				 $sub.eq(nowIdx).stop().slideDown(300)
			})

			//클릭한 gnb-sub 영역 벗어나면 슬라이드업
			$gnb.on('mouseleave', function(evt) {
				 evt.preventDefault()
				 nowIdx = $(this).index()
				 $sub.eq(nowIdx).stop().slideUp(300)
			})

			//하단 메뉴 slideUp/Down 
			$mnu.on('click', function(evt) {
				 evt.preventDefault()
				 evt.stopPropagation();
				 nowIdx = $mnu.index(this)
				 $mnu.parent().eq(nowIdx).children('ol').slideDown() 
				 $mnu.parent().eq(nowIdx).siblings().children('ol').slideUp()
			})
		 }
	})
});

$(function() {
	const $mg_slide = $('.mainGame ul')
	const $mg_nowPag = $('.mainGame .slide-navi span')
	const $gotoTop = $('.gotoTop > div > a')
	let nowIdx = 0

		 //goTop - 맨 위로 이동
		 $gotoTop.on('click', function(evt) {
				$('html,body').stop().animate(
					 {
							scrollTop: 0
					 },
					 400
				)
				evt.preventDefault()
		 })

	//모바일만
	const mg_MoveFn = function() {
		 $mg_slide.stop().animate(
				{
					 left: -100 * nowIdx + '%'
				},
				1000
		 )
		 $mg_nowPag.text(nowIdx + 1)
	}
	//이전버튼
	$('.mainGame .slide-prev').on('click', function(evt) {
		 if (nowIdx > 0) {
				nowIdx--
		 } else {
				nowIdx = 7
		 }
		 mg_MoveFn()
		 evt.preventDefault()
	})
	//다음버튼
	$('.mainGame .slide-next').on('click', function(evt) {
		 if (nowIdx < 7) {
				nowIdx++
		 } else {
				nowIdx = 0
		 }
		 mg_MoveFn()
		 evt.preventDefault()
	})
})