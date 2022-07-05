const frame = document.querySelector('section');
const mask = document.querySelector('aside');
const delay = convertSpeed('aside');

let imgs = '';

for (let i = 0; i < 200; i++) {
	imgs += `<img src='img/pic${i}.jpg' alt='image${i}' />`;
}

//console.log(imgs);
frame.innerHTML = imgs;

//동적으로 새성된 200개의 img요소 변수에 할당
const imgDOMS = frame.querySelectorAll('img');

//이미지가 로딩될때마다 증가될 카운터 변수 추가
let count = 0;

//img에 적용된 소스이미지가 로딩될떄마다
imgDOMS.forEach((img) => {
	img.onload = () => {
		//카운트값을 증가하고
		count++;
		//증가되는 카운트값을 다시 백분률로 변환
		const percent = parseInt((count / 200) * 100);
		//백분율 코드를 마스크에 출력
		mask.querySelector('span').innerText = percent;

		mask.querySelector('.bar').style.width = percent + '%';

		//백분률이 100에 도달하면
		if (percent === 100) {
			//마스크에 클래스를 붙여서 사라지는 모션주고
			mask.classList.add('off');

			//해당 박스의 transition시간인 2s 뒤에
			setTimeout(() => {
				//마스크 DON을 아예 제거
				mask.remove();
			}, delay);
		}
	};
});

//마우스무브시 좌표값 구하기
window.addEventListener('mousemove', (e) => {
	//console.log(e.pageX);

	const wid = window.innerWidth;
	//백분율 공식 (현재위치 / 전체 넓이 )*100
	//현재 200개의 이미지가 있으므로 200분율을 구하기위해 *200
	const percent = parseInt((e.pageX / wid) * 200);
	//console.log(percent);

	for (const img of imgDOMS) img.style.display = 'none';
	imgDOMS[percent].style.display = 'block';
});

//특정DOM의 transition-duration 밀리세컨드로 반환함수
function convertSpeed(el) {
	const item = document.querySelector(el);
	let dur = parseFloat(getComputedStyle(item).transitionDuration) * 1000;
	return dur;
}
