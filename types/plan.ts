export interface InsurancePlanFeatures {
    networkHospitals?: number
    csr?: number
    coPayment?: boolean
    roomRent?: string
    diseaseSubLimit?: boolean
    preExistingWaiting?: string
    prePostHospitalization?: string
    noClaimBonus?: string
    restoration?: string
    maternity?: boolean
    opdCover?: boolean
    ayush?: boolean
    healthCheckup?: string
    criticalIllness?: boolean
    terminalIllness?: boolean
    accidentalDeath?: boolean
    waiverOfPremium?: boolean
}

export interface IInsurancePlan {
    _id: string
    slug: string
    insurer: string
    planName: string
    logo?: string
    type: "health" | "term"
    features: InsurancePlanFeatures
    premium?: {
        age25?: number
        age35?: number
        age45?: number
    }
    dittoRating?: number
    csr?: string
    createdAt: Date
    updatedAt: Date
}