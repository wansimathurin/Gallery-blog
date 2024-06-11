export const initials =(name)=>{
    return name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[1].charAt(0).toUpperCase()
}
// export const BaseUrl = "http://localhost:3000"; //test mode
export const BaseUrl = "https://gallery-blog.vercel.app/"; //production mode
