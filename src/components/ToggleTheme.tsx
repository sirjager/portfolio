import {themeMode, themes} from '@/lib/themes';
import {component$, $} from '@builder.io/qwik';

export default component$(() => {
	const changeTheme = $(() => {
		function apply(value: string) {
			try {
				const theme = value.split('@')[0];
				const mode = themeMode(theme);
				document.documentElement.setAttribute('data-theme', theme);
				document.documentElement.setAttribute('data-theme-mode', mode);
				if (mode === 'dark') document.documentElement.classList.add('dark');
				else document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', `${theme}@${mode}`);
			} catch (_) {
				//
			}
		}
		const theme = document.documentElement.getAttribute('data-theme');
		if (!theme) {
			const _stored = localStorage.getItem('theme');
			if (_stored) apply(_stored);
			else apply(themes[0]);
		} else {
			const currentIndex = themes.indexOf(theme);
			if (currentIndex === -1) apply(themes[0]);
			else apply(themes[(currentIndex + 1) % themes.length]);
		}
	});

	return (
		<button
			aria-label="change theme"
			onClick$={changeTheme}
			class={[
				'group/tgthm border border-neutral/20 transition-all duration-300 ease-in-out dark:border-neutral-content/40',
				'btn-square relative grid place-items-center overflow-clip rounded-btn p-0',
				'after:transition-all after:duration-300 after:ease-in-out',
				"after:absolute after:h-full after:w-full after:rounded-btn after:bg-base-content after:content-['']",
				'after:-bottom-full hover:after:bottom-0',
			]}
		>
			<span class="z-[1]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class={[
						'transition duration-300 ease-in-out',
						'h-5 w-5 fill-base-content group-hover/tgthm:fill-base-200',
					]}
				>
					<path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
				</svg>
			</span>
		</button>
	);
});