export default function registerCompany(ipcMain, db) {
    ipcMain.handle('company:register', (_, { company, admin }) => {
        try {
            db.run(
                `INSERT INTO COMPANY (COMPANY_NAME, BUSINESS_NUMBER, INDUSTRY, ADDRESS) VALUES (?, ?, ?, ?)`,
                [company.name, company.bizNo, company.industry, company.address]
            )
            const companyId = db.exec('SELECT last_insert_rowid()')[0].values[0][0]

            db.run(
                `INSERT INTO USER (EMP_NO, USERNAME, EMAIL, PASSWORD, POSITION_NAME, IS_ADMIN) VALUES (?, ?, ?, ?, ?, 1)`,
                [admin.id, admin.name, admin.email, admin.pw, admin.role]
            )
            const userId = db.exec('SELECT last_insert_rowid()')[0].values[0][0]

            db.run(`UPDATE COMPANY SET ADMIN_USER_ID = ? WHERE COMPANY_ID = ?`, [userId, companyId])

            db.saveToFile()

            return {
                ok: true,
                user: { id: userId, empNo: admin.id, name: admin.name, email: admin.email, role: admin.role, isAdmin: true }
            }
        } catch (e) {
            return { ok: false, error: e.message }
        }
    })
}
