export async function getActivityById(id) {
  const glodalUrl = process.env.GLOBAL_URL;
  const response = await fetch(`${glodalUrl}/api/activities/${id}`);
  if (!response.ok) {
    console.error("Failed to fetch activity:", response.statusText);
    throw new Error("Failed to fetch activity");
  }
  return await response.json();
}
