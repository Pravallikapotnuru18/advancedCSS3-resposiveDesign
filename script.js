"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector("#main-navigation");


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        const navigationLinks =
            navigation.querySelectorAll("a");


        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(
            ".main-navigation a"
        );


    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");


            if (href === `#${currentSection}`) {

                link.setAttribute(
                    "aria-current",
                    "location"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =========================================
       CONTACT FORM VALIDATION
    ========================================= */

    const form =
        document.querySelector("#contact-form");


    if (form) {

        const fields = {

            name:
                document.querySelector("#name"),

            email:
                document.querySelector("#email"),

            subject:
                document.querySelector("#subject"),

            message:
                document.querySelector("#message")

        };


        const status =
            document.querySelector("#form-status");


        const setError =
            (field, message) => {

                const errorElement =
                    document.querySelector(
                        `#${field.id}-error`
                    );


                field.setAttribute(
                    "aria-invalid",
                    "true"
                );


                if (errorElement) {

                    errorElement.textContent =
                        message;

                }

            };


        const clearError =
            (field) => {

                const errorElement =
                    document.querySelector(
                        `#${field.id}-error`
                    );


                field.removeAttribute(
                    "aria-invalid"
                );


                if (errorElement) {

                    errorElement.textContent =
                        "";

                }

            };


        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                let isValid = true;

                let firstInvalidField = null;


                Object.values(fields)
                    .forEach((field) => {

                        clearError(field);

                    });


                if (
                    fields.name.value.trim()
                    === ""
                ) {

                    setError(
                        fields.name,
                        "Please enter your name."
                    );

                    isValid = false;

                    firstInvalidField ??=
                        fields.name;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        fields.email.value.trim()
                    )
                ) {

                    setError(
                        fields.email,
                        "Please enter a valid email address."
                    );

                    isValid = false;

                    firstInvalidField ??=
                        fields.email;
                }


                if (
                    fields.subject.value.trim()
                    === ""
                ) {

                    setError(
                        fields.subject,
                        "Please enter a subject."
                    );

                    isValid = false;

                    firstInvalidField ??=
                        fields.subject;
                }


                if (
                    fields.message.value.trim()
                    === ""
                ) {

                    setError(
                        fields.message,
                        "Please enter your message."
                    );

                    isValid = false;

                    firstInvalidField ??=
                        fields.message;
                }


                if (!isValid) {

                    if (firstInvalidField) {
                        firstInvalidField.focus();
                    }

                    if (status) {

                        status.textContent =
                            "Please correct the highlighted fields.";

                    }

                    return;
                }


                if (status) {

                    status.textContent =
                        "Message submitted successfully!";

                }


                form.reset();

                Object.values(fields)
                    .forEach((field) => {

                        clearError(field);

                    });

            }
        );

    }

});
