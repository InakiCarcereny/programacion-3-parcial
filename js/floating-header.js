export function floatingHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('floating');
        } else {
            header.classList.remove('floating');
        }
    });
}