<template>
    <div class="">
        <VueSlickCarousel v-bind="settings">
            <slot>

            </slot>
            <template #prevArrow="arrowOption">
                <div class="custom-arrow ca-back">
                    <!-- <h1>zurück</h1> -->
                </div>
            </template>
            <template #nextArrow="arrowOption">
                <div class="custom-arrow ca-next">
                    <!-- <h1>weiter</h1> -->
                </div>
            </template>
        </VueSlickCarousel>
    </div>
</template>

<script>
    // @ is an alias to /src
    import VueSlickCarousel from "vue-slick-carousel";
    import "vue-slick-carousel/dist/vue-slick-carousel.css";
    import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

    export default {
        name: "Home",
        components: {
            VueSlickCarousel,
        },
        data() {
            return {
                settings: {
                    // adaptiveHeight: true,
                    centerMode: true,
                    centerPadding: "0px",
                    // infinite: true,
                    slidesToShow: 1,
                    touchMove: true,
                    // autoplay: true,
                    speed: 1000,
                    responsive: [
                    ],
                    arrows: true,
                    dots: true,
                    // pauseOnHover: true,
                },
            };
        },
        methods: {},
        created() {
        },
    };
</script>
<style lang="scss">
    @import '../styles/reset.scss';
    @import '../styles/style.scss';

    .carouselContainer {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img.carouselImage {
            /*width: 80% !important;*/
        }
    }
</style>