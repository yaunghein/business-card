type ClassValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| ClassValue[]
	| { [key: string]: any };

export default function clx(...classes: ClassValue[]): string {
	return classes
		.flatMap((className) => {
			if (Array.isArray(className)) {
				return className;
			}

			if (typeof className === 'object' && className !== null) {
				return Object.entries(className)
					.filter(([_, value]) => Boolean(value))
					.map(([key]) => key);
			}

			return className;
		})
		.filter(Boolean)
		.join(' ')
		.trim()
		.replace(/\s+/g, ' ');
}
