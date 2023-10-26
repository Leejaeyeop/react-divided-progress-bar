{/* <template>
    <div style="display: flex">
        <div class="progress-bar-wrapper">
            <div class="progress-bar">
                <div
                    ref="percentageRef"
                    class="percentage"
                ></div>
            </div>
            <div
                class="divide-count"
                v-if="props.divide"
            >
                <div
                    v-for="index in getDivideCount"
                    :key="index"
                >
                    {{ (props.maxProgress / props.divideCount) * index }}
                </div>
                <div>{{ props.maxProgress }}</div>
            </div>
        </div>
        <div
            class="cur-progress"
            v-if="props.numToRight"
        >
            {{ curProgress }}%
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";

const props = defineProps({
    numToRight: Boolean,
    divide: Boolean,
    divideCount: {
        type: Number,
        default: 0,
    },
    maxProgress: {
        type: Number,
        default: 100,
    },
    curProgress: {
        type: Number,
        default: 0,
    },
    increaseDuration: {
        type: Number,
        default: 1000,
    },
    color: {
        type: String,
        default: "#007bff",
    },
});
const getDivideCount = computed(() => {
    let arr = [];
    for (let i = 0; i < props.divideCount; i++) arr.push(i);
    return arr;
});

const percentageRef = ref(null);

onMounted(() => {
    function animateProgressBar(targetPercentage, duration) {
        const percentageElement = percentageRef.value;
        percentageElement.style.backgroundColor = props.color;
        const startPercentage = 0;

        const startTime = performance.now();
        function updatePercentage(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPercentage = startPercentage + (targetPercentage - startPercentage) * progress;

            percentageElement.style.width = currentPercentage + "%";

            if (progress < 1) {
                requestAnimationFrame(updatePercentage);
            }
        }
        requestAnimationFrame(updatePercentage);
    }

    animateProgressBar(props.curProgress, props.increaseDuration);
});
</script>
<style scoped>
.progress-bar-wrapper {
    flex-grow: 1;
}
.progress-bar {
    width: 100%;
    border: 1px solid;
    border-radius: 15px;
    background-color: white;
    text-align: center;
    height: 2rem;
    position: relative;
    overflow: hidden;
    .percentage {
        height: 100%;
        background-color: #007bff;
    }
}
.divide-count {
    position: relative;
    display: flex;
    > *:last-child {
        position: absolute;
        right: 0px;
    }
    > :not(:last-child) {
        flex-grow: 1;
        text-align: left;
    }
}
.cur-progress {
    margin-left: 0.5rem;
    width: 4rem;
}
</style> */}
