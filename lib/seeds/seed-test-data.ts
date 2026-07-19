/**
 * seed-test-data.ts
 * Run: npx tsx lib/seeds/seed-test-data.ts
 */

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

import User from "../models/User"
import Inquiry from "../models/Inquiry"

function futureSlot(days = 3, hour = 10): string {
    const d = new Date()
    d.setDate(d.getDate() + days)
    d.setHours(hour, 0, 0, 0)
    const p = (n: number) => String(n).padStart(2, "0")
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(hour)}:00`
}
function pick<T>(arr: readonly T[]): T { return arr[Math.floor(Math.random()*arr.length)] }

const INS   = ["term","health","retirement","child","wealth","business"] as const
const HLTH  = ["healthy","medium","notgood","poor"] as const
const WHO   = ["self","family"] as const

const EMPLOYEES = [
    { name:"Ravi Sharma",      email:"ravi.sharma@test.com",      states:["Gujarat"],         languages:["Gujarati"],          pincodes:[],                    status:"active"   },
    { name:"Priya Nair",       email:"priya.nair@test.com",       states:["Kerala"],          languages:["Malayalam"],         pincodes:[],                    status:"active"   },
    { name:"Amit Verma",       email:"amit.verma@test.com",       states:["Delhi"],           languages:["Hindi"],             pincodes:[],                    status:"active"   },
    { name:"Sneha Pillai",     email:"sneha.pillai@test.com",     states:["Tamil Nadu"],      languages:["Tamil"],             pincodes:[],                    status:"active"   },
    { name:"Kiran Reddy",      email:"kiran.reddy@test.com",      states:["Andhra Pradesh","Telangana"], languages:["Telugu"],pincodes:[],                    status:"active"   },
    { name:"Meera Joshi",      email:"meera.joshi@test.com",      states:["Maharashtra","Goa"],languages:["Marathi","English"],pincodes:[],                    status:"active"   },
    { name:"Arjun Singh",      email:"arjun.singh@test.com",      states:["Punjab","Haryana","Chandigarh"],languages:["Punjabi","Hindi"],pincodes:[],         status:"active"   },
    { name:"Deepa Rao",        email:"deepa.rao@test.com",        states:["Karnataka"],       languages:["Kannada","English"], pincodes:[],                    status:"active"   },
    { name:"Suresh Kumar",     email:"suresh.kumar@test.com",     states:["Maharashtra"],     languages:["Marathi","Hindi"],   pincodes:["400001","400002","400003"], status:"active" },
    { name:"Pooja Gupta",      email:"pooja.gupta@test.com",      states:["Delhi"],           languages:["Hindi"],             pincodes:["110001","110002","110003"], status:"active" },
    { name:"Vijay Patel",      email:"vijay.patel@test.com",      states:["Gujarat"],         languages:["Gujarati"],          pincodes:["380001","380002","380009"], status:"active" },
    { name:"Anita Iyer",       email:"anita.iyer@test.com",       states:["Tamil Nadu"],      languages:["Tamil"],             pincodes:["600001","600002","600017"], status:"active" },
    { name:"Rajesh Menon",     email:"rajesh.menon@test.com",     states:["Maharashtra"],     languages:["Marathi"],           pincodes:["400001","400004","400005"], status:"active" },
    { name:"Kavitha Sundaram", email:"kavitha.sundaram@test.com", states:["Tamil Nadu"],      languages:["Tamil"],             pincodes:["600001","600010"],           status:"active" },
    { name:"Mohan Yadav",      email:"mohan.yadav@test.com",      states:["Uttar Pradesh","Bihar"],languages:["Hindi"],        pincodes:["226001","226002"],           status:"active" },
    { name:"Shalini Das",      email:"shalini.das@test.com",      states:["West Bengal"],     languages:["Bengali"],           pincodes:["700001","700012"],           status:"active" },
    { name:"James Lyngdoh",    email:"james.lyngdoh@test.com",    states:["Meghalaya","Manipur","Nagaland","Mizoram","Arunachal Pradesh"],languages:["English"],pincodes:[],status:"active"},
    { name:"Prerna Bhuyan",    email:"prerna.bhuyan@test.com",    states:["Assam","Tripura"], languages:["Assamese","Bengali"],pincodes:[],                    status:"active"   },
    { name:"Rakesh Tiwari",    email:"rakesh.tiwari@test.com",    states:["Uttar Pradesh","Bihar","Madhya Pradesh","Rajasthan","Chhattisgarh","Jharkhand","Uttarakhand"],languages:["Hindi"],pincodes:[],status:"active"},
    { name:"Inactive Employee",email:"inactive.emp@test.com",     states:["Gujarat"],         languages:["Gujarati"],          pincodes:["380001"],            status:"inactive" },
]

async function assignEmployee(active: any[], pincode: string, state: string, language: string) {
    let cands = active.filter(e => e.pincodes?.includes(pincode))
    if (!cands.length) {
        cands = active.filter(e => {
            const st = e.states?.length  ? e.states   : e.state    ? [e.state]    : []
            const la = e.languages?.length? e.languages: e.language ? [e.language] : []
            return st.includes(state) && la.includes(language)
        })
    }
    if (!cands.length) return null
    const ids   = cands.map((c:any)=>c._id)
    const counts= await Inquiry.aggregate([
        {$match:{assignedTo:{$in:ids},status:{$in:["new","contacted"]}}},
        {$group:{_id:"$assignedTo",count:{$sum:1}}}
    ])
    const cm = new Map(counts.map((x:any)=>[x._id.toString(),x.count as number]))
    cands.sort((a:any,b:any)=>{
        const ca=(cm.get(a._id.toString())??0) as number
        const cb=(cm.get(b._id.toString())??0) as number
        if(ca!==cb) return ca-cb
        return new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime()
    })
    return cands[0]
}

const GROUPS = [
    // A — Pincode match
    { label:"A — Pincode Match", count:30, gen:(i:number)=>{
        const pool=[
            {pincode:"400001",state:"Maharashtra",language:"Marathi"},
            {pincode:"400002",state:"Maharashtra",language:"Marathi"},
            {pincode:"400003",state:"Maharashtra",language:"Marathi"},
            {pincode:"400004",state:"Maharashtra",language:"Marathi"},
            {pincode:"400005",state:"Maharashtra",language:"Marathi"},
            {pincode:"110001",state:"Delhi",language:"Hindi"},
            {pincode:"110002",state:"Delhi",language:"Hindi"},
            {pincode:"110003",state:"Delhi",language:"Hindi"},
            {pincode:"380001",state:"Gujarat",language:"Gujarati"},
            {pincode:"380002",state:"Gujarat",language:"Gujarati"},
            {pincode:"380009",state:"Gujarat",language:"Gujarati"},
            {pincode:"600001",state:"Tamil Nadu",language:"Tamil"},
            {pincode:"600002",state:"Tamil Nadu",language:"Tamil"},
            {pincode:"600010",state:"Tamil Nadu",language:"Tamil"},
            {pincode:"600017",state:"Tamil Nadu",language:"Tamil"},
            {pincode:"226001",state:"Uttar Pradesh",language:"Hindi"},
            {pincode:"226002",state:"Uttar Pradesh",language:"Hindi"},
            {pincode:"700001",state:"West Bengal",language:"Bengali"},
            {pincode:"700012",state:"West Bengal",language:"Bengali"},
        ]
        const e=pool[i%pool.length]
        return {name:`Pincode-${i+1}`,phone:`9${String(800000000+i).padStart(9,"0")}`,email:`pincode${i+1}@test.com`,
            insuranceType:INS[i%INS.length],state:e.state,language:e.language,pincode:e.pincode,
            preferredSlot:futureSlot(3+(i%7),9+(i%8)),whoFor:WHO[i%2],healthRating:HLTH[i%4],
            dob:`${1970+(i%30)}-${String((i%12)+1).padStart(2,"0")}-15`,
            status:(["new","new","new","contacted","resolved"] as const)[i%5]}
    }},
    // B — State+Language fallback
    { label:"B — State+Lang Fallback", count:30, gen:(i:number)=>{
        const pool=[
            {state:"Kerala",language:"Malayalam",pincode:"682001"},
            {state:"Kerala",language:"Malayalam",pincode:"682002"},
            {state:"Gujarat",language:"Gujarati",pincode:"395001"},
            {state:"Gujarat",language:"Gujarati",pincode:"390001"},
            {state:"Andhra Pradesh",language:"Telugu",pincode:"520001"},
            {state:"Telangana",language:"Telugu",pincode:"500001"},
            {state:"Karnataka",language:"Kannada",pincode:"560001"},
            {state:"Karnataka",language:"English",pincode:"560002"},
            {state:"Punjab",language:"Punjabi",pincode:"141001"},
            {state:"Haryana",language:"Hindi",pincode:"122001"},
            {state:"Chandigarh",language:"Hindi",pincode:"160001"},
            {state:"Maharashtra",language:"Marathi",pincode:"411001"},
            {state:"Goa",language:"English",pincode:"403001"},
            {state:"Assam",language:"Assamese",pincode:"781001"},
            {state:"West Bengal",language:"Bengali",pincode:"711101"},
            {state:"Tripura",language:"Bengali",pincode:"799001"},
            {state:"Uttar Pradesh",language:"Hindi",pincode:"208001"},
            {state:"Bihar",language:"Hindi",pincode:"800001"},
            {state:"Rajasthan",language:"Hindi",pincode:"302001"},
            {state:"Madhya Pradesh",language:"Hindi",pincode:"462001"},
        ]
        const e=pool[i%pool.length]
        return {name:`Fallback-${i+1}`,phone:`8${String(700000000+i).padStart(9,"0")}`,email:`fallback${i+1}@test.com`,
            insuranceType:INS[(i+2)%INS.length],state:e.state,language:e.language,pincode:e.pincode,
            preferredSlot:futureSlot(4+(i%5),10+(i%6)),whoFor:WHO[(i+1)%2],healthRating:HLTH[(i+1)%4],
            dob:`${1975+(i%25)}-${String((i%12)+1).padStart(2,"0")}-20`,
            status:(["new","new","contacted"] as const)[i%3]}
    }},
    // C — No match
    { label:"C — No Match (Unassigned)", count:20, gen:(i:number)=>{
        const pool=[
            {state:"Lakshadweep",language:"Malayalam",pincode:"682555"},
            {state:"Andaman and Nicobar Islands",language:"English",pincode:"744101"},
            {state:"Dadra and Nagar Haveli",language:"Hindi",pincode:"396191"},
            {state:"Daman and Diu",language:"Hindi",pincode:"396210"},
            {state:"Puducherry",language:"Tamil",pincode:"605001"},
            {state:"Jammu and Kashmir",language:"Kashmiri",pincode:"180001"},
            {state:"Ladakh",language:"Hindi",pincode:"194101"},
            {state:"Sikkim",language:"English",pincode:"737101"},
            {state:"Gujarat",language:"Urdu",pincode:"364001"},
            {state:"Tamil Nadu",language:"Urdu",pincode:"625001"},
        ]
        const e=pool[i%pool.length]
        return {name:`Unassigned-${i+1}`,phone:`7${String(600000000+i).padStart(9,"0")}`,email:`unassigned${i+1}@test.com`,
            insuranceType:INS[(i+3)%INS.length],state:e.state,language:e.language,pincode:e.pincode,
            preferredSlot:futureSlot(5+(i%4),11+(i%5)),whoFor:WHO[i%2],healthRating:HLTH[(i+2)%4],
            dob:`${1980+(i%20)}-06-10`,status:"new" as const}
    }},
    // D — Shared pincode (load distribution)
    { label:"D — Shared Pincode Load", count:10, gen:(i:number)=>{
        const e=i%2===0?{pincode:"400001",state:"Maharashtra",language:"Marathi"}:{pincode:"600001",state:"Tamil Nadu",language:"Tamil"}
        return {name:`Load-${i+1}`,phone:`6${String(500000000+i).padStart(9,"0")}`,email:`load${i+1}@test.com`,
            insuranceType:pick(INS),state:e.state,language:e.language,pincode:e.pincode,
            preferredSlot:futureSlot(2+i,10),whoFor:pick(WHO),healthRating:pick(HLTH),dob:`1988-0${(i%9)+1}-15`,status:"new" as const}
    }},
    // E — Edge cases
    { label:"E — Edge Cases", count:10, gen:(i:number)=>{
        const C=[
            {type:"term",health:"healthy",who:"self",pincode:"110001",state:"Delhi",lang:"Hindi"},
            {type:"health",health:"medium",who:"family",pincode:"400001",state:"Maharashtra",lang:"Marathi"},
            {type:"retirement",health:"notgood",who:"self",pincode:"380001",state:"Gujarat",lang:"Gujarati"},
            {type:"child",health:"poor",who:"family",pincode:"600001",state:"Tamil Nadu",lang:"Tamil"},
            {type:"wealth",health:"healthy",who:"self",pincode:"560001",state:"Karnataka",lang:"Kannada"},
            {type:"business",health:"medium",who:"self",pincode:"500001",state:"Telangana",lang:"Telugu"},
            {type:"term",health:"poor",who:"family",pincode:"226001",state:"Uttar Pradesh",lang:"Hindi"},
            {type:"health",health:"notgood",who:"self",pincode:"700001",state:"West Bengal",lang:"Bengali"},
            {type:"child",health:"healthy",who:"family",pincode:"781001",state:"Assam",lang:"Assamese"},
            {type:"term",health:"healthy",who:"self",pincode:"141001",state:"Punjab",lang:"Punjabi"},
        ]
        const c=C[i%C.length]
        return {name:`Edge-${i+1}`,phone:`9${String(900000000+i).padStart(9,"0")}`,email:i===9?"":` edgecase${i+1}@test.com`,
            insuranceType:c.type,state:c.state,language:c.lang,pincode:c.pincode,
            preferredSlot:futureSlot(6+i,14),whoFor:c.who,healthRating:c.health,
            healthNote:c.health==="poor"?"Hypertension and Type 2 diabetes":undefined,
            dob:`1990-0${(i%9)+1}-01`,status:"new" as const}
    }},
]

async function main() {
    const uri=process.env.MONGODB_URI
    if(!uri) throw new Error("MONGODB_URI not defined")
    await mongoose.connect(uri)
    console.log("Connected to MongoDB\n")

    const {deletedCount:ed}=await User.deleteMany({role:"employee"})
    console.log(`Cleared ${ed} employees`)
    const {deletedCount:id}=await Inquiry.deleteMany({})
    console.log(`Cleared ${id} inquiries\n`)

    const ph=await bcrypt.hash("Employee@123",12)
    const created: any[]=[]
    for(const emp of EMPLOYEES){
        const d=await User.create({name:emp.name,email:emp.email,passwordHash:ph,role:"employee",states:emp.states,languages:emp.languages,pincodes:emp.pincodes,status:emp.status as any})
        created.push(d.toObject())
        console.log(`  ${emp.status==="inactive"?"[INACTIVE]":"[ACTIVE]  "} ${emp.name.padEnd(22)} states=${emp.states.join(",")} pincodes=[${emp.pincodes.join(",")}]`)
    }
    const active=created.filter(e=>e.status==="active")
    console.log(`\nCreated ${created.length} employees (${active.length} active, 1 inactive)\n`)

    const report: Record<string,{name:string;pincode:number;stateLang:number}>={}
    let unassigned=0, total=0

    for(const g of GROUPS){
        console.log(`\n--- ${g.label} (${g.count}) ---`)
        for(let i=0;i<g.count;i++){
            const data=g.gen(i)
            const emp=await assignEmployee(active,data.pincode,data.state,data.language)
            const isPincode=emp?.pincodes?.includes(data.pincode)
            const mt=!emp?"UNASSIGNED":isPincode?"PINCODE   ":"STATE+LANG"
            await Inquiry.create({name:data.name,phone:data.phone,email:data.email??"",insuranceType:data.insuranceType as any,state:data.state,language:data.language,pincode:data.pincode,preferredSlot:data.preferredSlot,whoFor:data.whoFor as any,healthRating:data.healthRating as any,healthNote:(data as any).healthNote,dob:data.dob,status:data.status??"new",assignedTo:emp?._id??null})
            total++
            if(emp){
                const eid=emp._id.toString()
                if(!report[eid]) report[eid]={name:emp.name,pincode:0,stateLang:0}
                isPincode?report[eid].pincode++:report[eid].stateLang++
            } else { unassigned++ }
            console.log(`  [${mt}] ${data.name.padEnd(20)} -> ${emp?emp.name:"UNASSIGNED"} (${data.state}/${data.pincode})`)
        }
    }

    console.log("\n"+"=".repeat(70))
    console.log("ASSIGNMENT REPORT")
    console.log("=".repeat(70))
    console.log(`Total: ${total}  Assigned: ${total-unassigned}  Unassigned: ${unassigned}`)
    console.log()
    Object.values(report).sort((a,b)=>(b.pincode+b.stateLang)-(a.pincode+a.stateLang)).forEach(r=>{
        const t=r.pincode+r.stateLang
        console.log(`  ${r.name.padEnd(24)} TOTAL=${t} [pincode=${r.pincode} state+lang=${r.stateLang}] ${"#".repeat(Math.min(t,30))}`)
    })

    console.log()
    const inId=created.find(e=>e.email==="inactive.emp@test.com")?._id
    const inAss=await Inquiry.countDocuments({assignedTo:inId})
    console.log(`Inactive employee check: ${inAss===0?"PASS - 0 assigned":"FAIL - "+inAss+" assigned"}`)
    const dbUn=await Inquiry.countDocuments({assignedTo:null})
    console.log(`Unassigned in DB: ${dbUn} (expected ~20)`)
    console.log()
    for(const t of INS){
        const n=await Inquiry.countDocuments({insuranceType:t})
        console.log(`  ${t.padEnd(12)}: ${n} inquiries`)
    }
    console.log()
    console.log("All employee passwords: Employee@123")
    console.log("=".repeat(70))
    await mongoose.disconnect()
    console.log("Done!")
}
main().catch(err=>{console.error("Seed failed:",err);process.exit(1)})
