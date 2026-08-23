        /* ========================================
           DARK / LIGHT MODE
        ======================================== */

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        themeToggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "light"
                );


                if (
                    document.body.classList.contains(
                        "light"
                    )
                ) {

                    themeToggle.textContent =
                        "🌙 Mode Gelap";

                }

                else {

                    themeToggle.textContent =
                        "☀ Mode Terang";

                }

            }
        );



        /* ========================================
           SCROLL REVEAL
        ======================================== */

        const reveals =
            document.querySelectorAll(
                ".reveal"
            );


        function revealOnScroll() {

            reveals.forEach(
                function (element) {

                    const windowHeight =
                        window.innerHeight;


                    const elementTop =
                        element
                        .getBoundingClientRect()
                        .top;


                    if (
                        elementTop <
                        windowHeight - 100
                    ) {

                        element.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            revealOnScroll
        );


        revealOnScroll();



        /* ========================================
           RANGE INPUT
        ======================================== */

        const priority =
            document.getElementById(
                "prioritas"
            );


        const priorityValue =
            document.getElementById(
                "priorityValue"
            );


        function updatePriority() {

            const value =
                Number(
                    priority.value
                );


            let label;


            if (value === 1) {

                label =
                    "B aja";

            }

            else if (value === 2) {

                label =
                    "Lumayan";

            }

            else if (value === 3) {

                label =
                    "Keren";

            }

            else if (value === 4) {

                label =
                    "Sangat Keren";

            }

            else {

                label =
                    "Amazing";

            }


            priorityValue.textContent =
                label +
                " · " +
                value +
                "/5";

        }


        priority.addEventListener(
            "input",
            updatePriority
        );


        updatePriority();



        /* ========================================
           CONTACT FORM
        ======================================== */

        const form =
            document.getElementById(
                "contactForm"
            );


        const submitButton =
            document.getElementById(
                "submitButton"
            );


        const formStatus =
            document.getElementById(
                "formStatus"
            );


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const formData =
                    new FormData(form);


                const data =
                    Object.fromEntries(
                        formData.entries()
                    );


                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Sending... 🚀";


                formStatus.className =
                    "form-status";


                formStatus.textContent =
                    "";


                try {

                    const response =
                        await fetch(
                            form.action,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify(
                                        data
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    if (
                        response.ok &&
                        result.success !== false
                    ) {

                        formStatus.className =
                            "form-status success";


                        formStatus.textContent =
                            "✓ Pesan berhasil dikirim! ✨";


                        form.reset();


                        updatePriority();


                        submitButton.textContent =
                            "Message Sent ✓";


                        setTimeout(
                            function () {

                                submitButton.disabled =
                                    false;

                                submitButton.textContent =
                                    "Send Message 🚀";

                            },
                            3000
                        );

                    }

                    else {

                        throw new Error(
                            "Gagal mengirim pesan."
                        );

                    }

                }


                catch (error) {

                    formStatus.className =
                        "form-status error";


                    formStatus.textContent =
                        "✕ Pesan gagal dikirim. Coba lagi ya.";


                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        "Send Message 🚀";

                }

            }
        );