document.addEventListener("DOMContentLoaded", function () {
    const mmkAmountInput = document.getElementById("mmk-amount");
    const aedAmountInput = document.getElementById("aed-amount");
    const usdAmountInput = document.getElementById("usd-amount");
    const usdAmountInputMMK = document.getElementById("usd-amount-mmk");
    const mmkAmountInputMMK = document.getElementById("mmk-amount-mmk");
    const USD_MMK_RATE_MMK = document.getElementById("usd-mmk-rate-mmk");
    const aedFromUsdInput = document.getElementById("aed-from-usd");
    const mmkAedRateSpan = document.getElementById("mmk-aed-rate");
    const usdAedRateInput = document.getElementById("usd-aed-rate");
    const comparisonRateSpan = document.getElementById("comparison-rate");
    const insert100000MMKButton = document.getElementById("insert-100000-mmk");
    const insert200USD = document.getElementById("insert-200-usd");
    const insert200USDMMK = document.getElementById("insert-200-usd-mmk");
    const calculateBtn = document.getElementById("usd_aed_calculate");
    const calculateMMKBtn = document.getElementById("usd_mmk_calculate");
    const aed_mmk_rate = document.getElementById("aed-mmk-rate-mmk");
    const aed_mmk_rate_btn = document.getElementById("aed_mmk_calculate");
    const aed_mmk_cal_btn = document.getElementById("aed_mmk_cal_btn");
    const clear_btn = document.getElementById("clear_btn");
    const clear_btn_usd = document.getElementById("clear_btn_usd");
    const clear_btn_usd_aed = document.getElementById("clear_btn_usd_aed");


    // Get references to the input fields
    const aedServInput = document.querySelector('.aed_serv_input');
    const percentageInput = document.querySelector('.percentage-input');

    // Add event listeners to both input fields
    aedServInput.addEventListener('input', function () {
        if (this.value !== '') {
            // If AED input has a value, disable the percentage input
            percentageInput.disabled = true;
        } else {
            // If AED input is empty, enable the percentage input
            percentageInput.disabled = false;
        }
    });

    percentageInput.addEventListener('input', function () {
        if (this.value !== '') {
            // If percentage input has a value, disable the AED input
            aedServInput.disabled = true;
        } else {
            // If percentage input is empty, enable the AED input
            aedServInput.disabled = false;
        }
    });


    clear_btn.addEventListener("click", () => {
        mmkAmountInput.value = "";
        aedAmountInput.value = "";
        mmkAedRateSpan.value = "";
    })


    clear_btn_usd.addEventListener("click", () => {
        usdAmountInput.value = "";
        aedFromUsdInput.value = "";
        aedServInput.value = "";
        percentageInput.value = "";
        usdAedRateInput.value = "";
    })

    clear_btn_usd_aed.addEventListener("click", () => {
        aedFromUsdInput.value = "";
    })

    insert100000MMKButton.addEventListener("click", function () {
        mmkAmountInput.value = "100000";
        updateRates();
    });

    insert200USD.addEventListener("click", () => {
        usdAmountInput.value = "200";
        console.log("insert200USD working debug")
    })

    insert200USDMMK.addEventListener("click", () => {
        usdAmountInputMMK.value = "200";
        updateRates();
    })

    calculateBtn.addEventListener("click", () => {

        const usdAmount = parseFloat(usdAmountInput.value);
        const aedFromUsd = parseFloat(aedFromUsdInput.value);
        const usdAEDrate = parseFloat(usdAedRateInput.value);
        const service_charges = parseFloat(aedServInput.value);
        const percentage_ser_chg = parseFloat(percentageInput.value);

        //
        if (!isNaN(usdAmount) && !isNaN(aedFromUsd)) {
            const usdToAedRate = aedFromUsd / usdAmount;
            usdAedRateInput.value = usdToAedRate.toFixed(5);
        }
        //calculate how much AED get if i have USD and know USD-AED rate
        else if (!isNaN(usdAmount) && !isNaN(usdAEDrate) && !isNaN(service_charges)) {
            const aedAmount = (usdAmount * usdAEDrate) - service_charges;
            const serv_chg_per = (service_charges / aedAmount) * 100;
            aedFromUsdInput.value = aedAmount.toFixed(2);
            percentageInput.value = serv_chg_per;
        } else if (!isNaN(usdAmount) && !isNaN(usdAEDrate) && !isNaN(percentage_ser_chg)) {
            const aedAmount = usdAmount * usdAEDrate
            console.log("AED amount", aedAmount)
            const service_chg_amount = aedAmount * (percentage_ser_chg / 100)
            console.log("service charges amount" + service_chg_amount)
            const final_aedAmount = aedAmount - service_chg_amount
            aedFromUsdInput.value = final_aedAmount.toFixed(2);
        }
    })

    aed_mmk_cal_btn.addEventListener("click", () => {
        const mmkAmount = parseFloat(mmkAmountInput.value);
        const aedAmount = parseFloat(aedAmountInput.value);
        const mmkAedRate = parseFloat(mmkAedRateSpan.value);

        if (!isNaN(mmkAmount) && !isNaN(mmkAedRate)) {

            const aedAmount_result = mmkAmount / mmkAedRate
            aedAmountInput.value = aedAmount_result.toFixed(2);
        }

        if (!isNaN(aedAmount) && !isNaN(mmkAedRate)) {
            mmkAmountInput.value = aedAmount * mmkAedRate
        }

        if (!isNaN(mmkAmount) && !isNaN(aedAmount)) {
            const mmk_aed_rate_result = mmkAmount / aedAmount
            mmkAedRateSpan.value = mmk_aed_rate_result.toFixed(2);
        }
    })

    calculateMMKBtn.addEventListener("click", () => {
        const usdAmountMMK = parseFloat(usdAmountInputMMK.value);
        const usd_mmk_rate = parseFloat(USD_MMK_RATE_MMK.value);
        const mmk_amount_input = parseFloat(mmkAmountInputMMK.value);
        //usd and mmk
        if (!isNaN(usdAmountMMK) && !isNaN(usd_mmk_rate)) {
            const usd_mmk_exchange = usdAmountMMK * usd_mmk_rate;
            mmkAmountInputMMK.value = usd_mmk_exchange.toFixed(2);
        }

        if (!isNaN(mmk_amount_input) && !isNaN(usd_mmk_rate)) {
            const usd_amount_result = mmk_amount_input / usd_mmk_rate;
            usdAmountInputMMK.value = usd_amount_result.toFixed(2);
        }
    })

    aed_mmk_rate_btn.addEventListener("click", () => {
        updateRates();
    })

    function updateRates() {
        const mmkAmount = parseFloat(mmkAmountInput.value);
        const aedAmount = parseFloat(aedAmountInput.value);
        const usdAmount = parseFloat(usdAmountInput.value);
        const aedFromUsd = parseFloat(aedFromUsdInput.value);
        const usdAEDrate = parseFloat(usdAedRateInput.value);
        const usdAmountMMK = parseFloat(usdAmountInputMMK.value);
        const mmkAmountMMK = parseFloat(mmkAmountInputMMK.value);
        const usd_mmk_rate = parseFloat(USD_MMK_RATE_MMK.value);

        //usd and mmk
        if (!isNaN(usdAmountMMK) && !isNaN(usd_mmk_rate)) {
            const usd_mmk_exchange = usdAmountMMK * usd_mmk_rate;
            mmkAmountInputMMK.value = usd_mmk_exchange.toFixed(2);
        }

        //aed and mmk
        if (!isNaN(mmkAmountMMK) && !isNaN(aedFromUsd)) {
            const aed_to_mmk_rate = mmkAmountMMK / aedFromUsd
            aed_mmk_rate.value = aed_to_mmk_rate.toFixed(2);
        }


        //mmk and aed
        if (!isNaN(mmkAmount) && !isNaN(aedAmount)) {
            const mmkToAedRate = mmkAmount / aedAmount;
            mmkAedRateSpan.value = mmkToAedRate.toFixed(2);
        }
    }
});
