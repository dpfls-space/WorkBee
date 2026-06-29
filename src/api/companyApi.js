export function registerCompany(company, admin) {
    return window.electron.invoke('company:register', { company, admin })
}
