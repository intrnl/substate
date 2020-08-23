export function equal (a: any, b: any): boolean {
	return a === b;
}

export function shallow (a: any, b: any): boolean {
	if (!is_object(a) || !is_object(b)) return a === b;
	if (get_keys_length(a) !== get_keys_length(b)) return false;

	for (let key in a) {
		if (a[key] !== b[key]) return false;
	}

	for (let key in b) {
		if (a[key] !== b[key]) return false;
	}

	return true;
}


function is_object (value: any): value is Record<any, any> {
	return value && typeof value === 'object';
}

function get_keys_length (value: object): number {
	return Object.keys(value).length;
}
