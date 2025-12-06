export default function clickOutside(element: HTMLElement, callbackFunction: () => void) {
	function onClick(event: MouseEvent) {
		if (!element.contains(event.target as HTMLElement)) {
			callbackFunction();
		}
	}

	document.body.addEventListener('click', onClick);

	return {
		update(newCallbackFunction: () => void) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		}
	};
}
