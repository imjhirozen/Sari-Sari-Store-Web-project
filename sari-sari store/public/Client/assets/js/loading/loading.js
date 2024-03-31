export function displayLoading (){
    // Populate the page loading element dynamically.
    // Optionally you can skipt this part and place the HTML
    // code in the body element by refer to the above HTML code tab.
    const loadingEl = document.createElement("div");
    document.body.prepend(loadingEl);
    loadingEl.id = 'loading-container';
    loadingEl.classList.add("page-loader");
    loadingEl.classList.add("flex-column");
    loadingEl.style.position = 'fixed';
    loadingEl.style.top = '0';
    loadingEl.style.left = '0';
    loadingEl.style.bottom = '0';
    loadingEl.style.right = '0';
    loadingEl.style.zIndex = '999';
    loadingEl.style.backdropFilter = 'blur(4px)';
    loadingEl.style.display = 'block'
    loadingEl.innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
        <span class="spinner-border text-primary" role="status"></span>
        <span class="text-muted fs-6 fw-semibold mt-3">Loading...</span>
    </div>
    `;

    
    
}

export function removeLoading (){
    const loadingEl = document.querySelector('#loading-container');
    loadingEl.style.display = 'none';
}