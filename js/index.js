const ITEMS_PER_PAGE = 11;
const SCROLL_DELAY = 1000;
const TRANSITION = 1000;
let enableScroll = true;
let touchStartY;
let touchEndY;

window.addEventListener(
	"wheel",
	function (event) {
		event.preventDefault();
		if (!enableScroll) return;
		if (event.deltaY > 0) app.nextItem();
		else app.prevItem();
		enableScroll = false;
		setTimeout(() => (enableScroll = true), SCROLL_DELAY);
	},
	{ passive: false }
);

document.addEventListener("touchstart", function (e) {
	touchStartY = e.touches[0].pageY;
});

document.addEventListener("touchmove", function (e) {
	if (!enableScroll) return;
	touchEndY = e.touches[0].pageY;
	if (touchStartY < touchEndY) {
		app.prevItem();
		enableScroll = false;
		setTimeout(() => (enableScroll = true), SCROLL_DELAY);
	} else if (touchStartY > touchEndY) {
		app.nextItem();
		enableScroll = false;
		setTimeout(() => (enableScroll = true), SCROLL_DELAY);
	}
});

document.addEventListener("touchend", function (e) {
	touchStartY = null;
	touchEndY = null;
});

class Subject {
	constructor(year, title, subtitle, img, sketch, description) {
		this.year = year;
		this.title = title;
		this.subtitle = subtitle;
		this.img = img;
		this.sketch = sketch;
		this.description = description;
	}
}

let app = Vue.createApp({
	data() {
		return {
			list: [
				new Subject(
					2023,
					"LOMA VA5",
					"羅馬VA5",
					"VA5羅馬大圖.jpg",
					"VA5羅馬.png",
					"更安心的高規格住宅\n型塑「安全，節能，智慧，環保」四大概念設計\n打造時代頂端的宜居住宅，即使歷經歲月考驗\n價值光芒仍然不減，未來依舊經典"
				),
				new Subject(
					2024,
					"BAOREN VA3",
					"凡人居3",
					"VA5羅馬大圖02.jpg",
					"VA2.png",
					"更安心的高規格住宅\n型塑「安全，節能，智慧，環保」四大概念設計\n打造時代頂端的宜居住宅，即使歷經歲月考驗\n價值光芒仍然不減，未來依舊經典"
				),
				new Subject(
					2032,
					"LOMA VA5",
					"羅馬VA5",
					"VA5羅馬大圖.jpg",
					"VA5羅馬.png",
					"更安心的高規格住宅\n型塑「安全，節能，智慧，環保」四大概念設計\n打造時代頂端的宜居住宅，即使歷經歲月考驗\n價值光芒仍然不減，未來依舊經典"
				),
				new Subject(
					2024,
					"BAOREN VA3",
					"凡人居3",
					"VA5羅馬大圖02.jpg",
					"VA2.png",
					"更安心的高規格住宅\n型塑「安全，節能，智慧，環保」四大概念設計\n打造時代頂端的宜居住宅，即使歷經歲月考驗\n價值光芒仍然不減，未來依舊經典"
				),
				new Subject(
					2023,
					"LOMA VA5",
					"羅馬VA5",
					"VA5羅馬大圖.jpg",
					"VA5羅馬.png",
					"更安心的高規格住宅\n型塑「安全，節能，智慧，環保」四大概念設計\n打造時代頂端的宜居住宅，即使歷經歲月考驗\n價值光芒仍然不減，未來依舊經典"
				),
				new Subject(
					2024,
					"BAOREN VA3",
					"凡人居3",
					"VA5羅馬大圖02.jpg",
					"VA2.png",
					"更安心的高規格住宅\n型塑「安全，節能，智慧，環保」四大概念設計\n打造時代頂端的宜居住宅，即使歷經歲月考驗\n價值光芒仍然不減，未來依舊經典"
				),
			],
			activeIndex: 0,
			prevIndex: 0,
			title: "",
			subtitle: "",
			description: "",
			animation: false,
			animationDelay: false,
		};
	},
	methods: {
		init() {
			this.title = this.list[0].title;
			this.subtitle = this.list[0].subtitle;
			this.doAnimate(1, 0);
		},
		setItem(index) {
			this.prevIndex = this.activeIndex;
			this.activeIndex = index;
			if (this.prevIndex != this.activeIndex) this.doAnimate(this.prevIndex, this.activeIndex);
		},
		prevItem() {
			this.prevIndex = this.activeIndex;
			this.activeIndex = Math.max(0, this.activeIndex - 1);
			if (this.prevIndex != this.activeIndex) this.doAnimate(this.prevIndex, this.activeIndex);
		},
		nextItem() {
			this.prevIndex = this.activeIndex;
			this.activeIndex = Math.min(this.list.length - 1, this.activeIndex + 1);
			if (this.prevIndex != this.activeIndex) this.doAnimate(this.prevIndex, this.activeIndex);
		},
		doAnimate(from, to) {
			this.animation = true;
			this.changeYear(this.list[this.activeIndex].year.toString(), "bar-title-year", "#left .number");
			this.changeYear(this.list[this.activeIndex].year.toString(), "title-year", "#middle .text .number");
			this.changeYear(this.list[this.activeIndex].year.toString(), "title-year-2", "#middle .text2 .number");
			this.changeImage(from, to, "images");
			this.changeImage(from, to, "sketchs");
			setTimeout(() => {
				this.title = this.list[this.activeIndex].title;
				this.subtitle = this.list[this.activeIndex].subtitle;
				this.description = this.list[this.activeIndex].description;
			}, TRANSITION / 2);
			setTimeout(() => {
				this.animation = false;
				this.animationDelay = true;
				setTimeout(() => (this.animationDelay = false), TRANSITION);
			}, TRANSITION);
		},
		changeYear(newYear, ref, numSelector) {
			const yearEl = this.$refs[ref];
			const oldYear = yearEl.textContent;
			const newYearEls = newYear.split("").map((number, index) => {
				const oldNumber = oldYear[index];
				if (number === oldNumber && index != 3) return `<span>${number}</span>`;
				else return `<span class="number"><span>${oldNumber}</span>${number}</span>`;
			});
			yearEl.innerHTML = newYearEls.join("");
			const newNumberEls = document.querySelectorAll(numSelector);
			newNumberEls.forEach(numberEl => {
				const oldNumberEl = numberEl.querySelector("span:first-child");
				const newNumberEl = numberEl.querySelector("span:last-child");
				oldNumberEl.addEventListener("animationend", () => {
					oldNumberEl.remove();
					newNumberEl.style.opacity = 1;
					newNumberEl.style.animation = "none";
				});
			});
		},
		changeImage(from, to, imgSelector) {
			let images = this.$refs[imgSelector];
			images.forEach(i => {
				i.classList.remove("top");
				i.classList.remove("bottom");
			});
			let direction = from < to ? "up" : "down";
			const currentImage = images[to];
			const previousImage = images[from];

			currentImage.classList.add("current");
			previousImage.classList.add("previous");
			currentImage.classList.add(direction);
			previousImage.classList.add(direction);
			setTimeout(() => {
				previousImage.classList.remove("previous");
				previousImage.classList.remove("current");
				currentImage.classList.remove(direction);
				previousImage.classList.remove(direction);
				if (from < to) {
					previousImage.classList.add("top");
					images[to + 1].classList.add("bottom");
				} else {
					previousImage.classList.add("bottom");
					images[to - 1].classList.add("top");
				}
			}, TRANSITION);
		},
	},
	computed: {
		scrollTop() {
			return (window.innerHeight / 11) * (3 - this.activeIndex) + 10;
		},
	},
}).mount("#app");
app.init();
