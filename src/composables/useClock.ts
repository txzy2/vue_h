import {ref, onUnmounted} from 'vue';

export function useClock() {
    const currentTime = ref('');

    const update = () => {
        currentTime.value = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    update();
    const interval = setInterval(update, 1000);
    onUnmounted(() => clearInterval(interval));

    return {currentTime};
}
