(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('apexcharts')) :
        typeof define === 'function' && define.amd ? define(['apexcharts'], factory) :
            (global.VueApexCharts = factory(global.ApexCharts));
}(this, (function (ApexCharts) { 'use strict';

    ApexCharts = ApexCharts && ApexCharts.hasOwnProperty('default') ? ApexCharts['default'] : ApexCharts;

    var ApexChartsComponent = {
        props: {
            options: {
                type: Object
            },
            type: {
                type: String,
                required: true,
                default: 'line'
            },
            series: {
                type: Array,
                required: true,
                default: []
            },
            labels: {
                type: Array,
                required: false,
            },
            width: {
                default: '100%'
            },
            height: {
                default: 'auto'
            }
        },
        data: function data() {
            return {
                chart: null
            };
        },
        mounted: function mounted() {
            this.init();
        },
        created: function created() {
            var _this = this;

            this.$watch('options', function (options) {
                if (!_this.chart && options) {
                    _this.init();
                } else {
                    _this.chart.updateOptions(_this.options, true);
                }
            });
            this.$watch('series', function (series) {
                if (!_this.chart && series) {
                    _this.init();
                } else {
                    _this.chart.updateSeries(_this.series, true);
                }
            }, {
                deep: true
            });
            this.$watch('labels', function (labels) {
                if (!_this.chart && labels) {
                    _this.init();
                } else {
                    _this.chart.updateOptions(_this.options, true);
                }
            }, {
                deep: true
            });
            var watched = ['type', 'width', 'height'];
            watched.forEach(function (prop) {
                _this.$watch(prop, function () {
                    _this.refresh();
                });
            });
        },
        beforeDestroy: function beforeDestroy() {
            if (!this.chart) {
                return;
            }

            this.destroy();
        },
        render: function render(createElement) {
            return createElement('div');
        },
        methods: {
            init: function init() {
                var newOptions = {
                    chart: {
                        type: this.type,
                        height: this.height,
                        width: this.width
                    },
                    series: this.series,
                    labels: this.labels
                };
                var config = ApexCharts.merge(this.options, newOptions);
                this.chart = new ApexCharts(this.$el, config);
                this.chart.render();
            },
            refresh: function refresh() {
                this.destroy();
                this.init();
            },
            destroy: function destroy() {
                this.chart.destroy();
            },
            updateSeries: function updateSeries() {
                this.$emit('updateSeries');
            },
            updateOptions: function updateOptions() {
                this.$emit('updateOptions');
            },
            updateLabels: function updateLabels() {
                this.$emit('updateOptions');
            }
        }
    };

    var VueApexCharts = ApexChartsComponent;

    VueApexCharts.install = function (Vue) {
        //adding a global method or property
        Vue.ApexCharts = ApexCharts; // add the instance method

        Object.defineProperty(Vue.prototype, '$apexcharts', {
            get: function get() {
                return ApexCharts;
            }
        });
    };

    return VueApexCharts;

})));
