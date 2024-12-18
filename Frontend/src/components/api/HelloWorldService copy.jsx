import apiClient from "./ApiClient";

export const retriveHelloWordBean = () => apiClient.get('/hello-world-bean');

// export const executeBasicAuthenticationService = (token) => apiClient.get('/basicauth', {
//     headers: {
//         Authorization: token
//     }
// });
// "token": "eyJraWQiOiJlNjc1NTJkNi01YTczLTQwOTAtYmM4NS1lYTlkMjQ3ZWY4MWEiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoicm9rb24iLCJleHAiOjE3MzM2ODcxOTIsImlhdCI6MTczMzY4MTc5Miwic2NvcGUiOiJST0xFX1VTRVIifQ.L7TXpuGKpG1K-zhCW9x42c_9jm_-OSn3Brjb5USx2VgAIBaQSxEARNSrZ8ubBMyBp_KohpPB8b8XZ300XbJ9Buq1n1qFGaPljNxI9xw1bh7hVUFFtGdKEAK4blHS9d8jI6PlO9aE9LG5-0OyGkPRdgLdS2MDiSphVlP8TifimZG5k5bVPGcH14m2OrsrBo5xNgt1XH3h47ZO5OSU_Xm-hsBdwL5-KSiMNqUKxklvfLru4SYTjb9Qhwo9EKaiQs5oPOIymSFK_TUo3xJX7hXPPRAXa9Qdb_ND6nhtsf4QEo_23BQOopkpezIUz2tX8_NW-71Ll2gvXkBmpDojWvQvHQ"

export const executeBasicAuthenticationService = (username, password) => apiClient.post('/authenticate', { username, password });