(function ($) {
    var isOrderCustomerActive = true,
        isOrderItemsActive = false,
        isOrderPaymentActive = false,
        isOrderDispatchActive = false;

    var orderContainerClasses = {
        customer: '.order__customer',
        items: '.order__items',
        payment: '.order__payment',
        dispatch: '.order__dispatch',
    }

    $('.btn-next').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        Object.keys(orderContainerClasses).forEach(key => {
            $(orderContainerClasses[key]).addClass('d-none');
        })

        if (isOrderPaymentActive) {
            $(`${orderContainerClasses.dispatch}, ${orderContainerClasses.payment},${orderContainerClasses.items}, ${orderContainerClasses.customer}`).removeClass("d-none")
            $this.text('Disptach Order');

            isOrderCustomerActive = isOrderItemsActive = isOrderDispatchActive = isOrderPaymentActive = true;
        } else if (isOrderItemsActive) {
            $(`${orderContainerClasses.payment},${orderContainerClasses.items}, ${orderContainerClasses.customer}`).removeClass("d-none")
            $this.text('Next (Goto Dispatch)');
            isOrderCustomerActive = isOrderItemsActive = isOrderPaymentActive = true;
        } else if (isOrderCustomerActive) {
            $(`${orderContainerClasses.items}, ${orderContainerClasses.customer}`).removeClass("d-none")
            $this.text('Next (Goto Payment)');
            isOrderCustomerActive = isOrderItemsActive = true;
        }
    })
})(jQuery)