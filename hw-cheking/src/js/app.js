	function joinUs(){
			const checkbox = document.querySelector(".form__label-checkbox");
			const label = document.createElement("label");
			label.innerHTML = "Repeat Password";
			label.classList.add("form__label");

			const input = document.createElement("input");
			input.setAttribute("type", "password");
			input.setAttribute("minlength", "6");
			input.classList.add("form__input");

			const error = document.createElement("div");
			error.classList.add("form__error");

			const errorText = document.createElement("p");
			errorText.classList.add("form__error-text");
			errorText.innerHTML = "password is too short";

			error.appendChild(errorText);
			label.appendChild(input);
			label.appendChild(error);

			checkbox.parentNode.replaceChild(label, checkbox);
		}

		const joinLink = document.getElementById("join");
		joinLink.addEventListener("click", joinUs);