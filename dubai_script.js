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




    insert100000MMKButton.addEventListener("click", function () {
        mmkAmountInput.value = "100000";
        updateRates();
    });

    insert200USD.addEventListener("click", () => {
        usdAmountInput.value = "200";
        updateRates();
    })

    insert200USDMMK.addEventListener("click", () => {
        usdAmountInputMMK.value = "200";
        updateRates();
    })

    calculateBtn.addEventListener("click", () => {
        updateRates();
    })

    calculateMMKBtn.addEventListener("click", () => {
        const usdAmountMMK = parseFloat(usdAmountInputMMK.value);
        const usd_mmk_rate = parseFloat(USD_MMK_RATE_MMK.value);
        //usd and mmk
        if (!isNaN(usdAmountMMK) && !isNaN(usd_mmk_rate)) {
            const usd_mmk_exchange = usdAmountMMK * usd_mmk_rate;
            mmkAmountInputMMK.value = usd_mmk_exchange.toFixed(2);
        } else {
            mmkAmountInputMMK.value = 0;
        }
    })

    aed_mmk_rate_btn.addEventListener("click", () => {
        updateRates();
    })

    mmkAmountInput.addEventListener("input", updateRates);
    aedAmountInput.addEventListener("input", updateRates);


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
        } else {
            mmkAmountInputMMK.value = 0;
        }

        //aed and mmk
        if (!isNaN(mmkAmountMMK) && !isNaN(aedFromUsd)) {
            if (usdAmountMMK == usdAmount) {
                const aed_to_mmk_rate = mmkAmountMMK / aedFromUsd
                aed_mmk_rate.value = aed_to_mmk_rate.toFixed(2);
            } else {
                alert("USD amounts are not same!");
            }

        } else {
            aed_mmk_rate.value = 0;
        }


        //mmk and aed
        if (!isNaN(mmkAmount) && !isNaN(aedAmount)) {
            const mmkToAedRate = mmkAmount / aedAmount;
            mmkAedRateSpan.textContent = mmkToAedRate.toFixed(2);
        } else {
            mmkAedRateSpan.textContent = "[auto]";
        }

        //usd and aed
        if (!isNaN(usdAmount) && !isNaN(aedFromUsd)) {
            const usdToAedRate = aedFromUsd / usdAmount;
            const mmkToAedRateFromUsd = aedAmount / aedFromUsd;
            usdAedRateInput.value = usdToAedRate.toFixed(2);
            comparisonRateSpan.textContent = mmkToAedRateFromUsd.toFixed(4);
        } else {
            usdAedRateInput.textContent = "[auto]";
            // comparisonRateSpan.textContent = "[auto]";
        }

        if (!isNaN(usdAmount) && !isNaN(usdAEDrate)) {
            const aedAmount = usdAmount * usdAEDrate
            aedFromUsdInput.value = aedAmount.toFixed();
        }
    }
});
