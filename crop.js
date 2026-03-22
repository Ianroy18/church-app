import { Jimp } from "jimp";

async function main() {
    try {
        const image = await Jimp.read("public/favicon.jpg");
        image.circle();
        image.write("public/favicon.png");
        console.log("SUCCESS");
    } catch (e) {
        console.error(e);
    }
}
main();
