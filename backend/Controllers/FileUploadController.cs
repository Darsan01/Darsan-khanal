using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace DarsanPortfolioAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin")]
public class FileUploadController : ControllerBase
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<FileUploadController> _logger;

    public FileUploadController(IWebHostEnvironment webHostEnvironment, ILogger<FileUploadController> logger)
    {
        _webHostEnvironment = webHostEnvironment;
        _logger = logger;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        // Define allowed extensions
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx" };
        var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(fileExtension))
            return BadRequest("Invalid file extension");

        // Limit file size to 10MB
        if (file.Length > 10 * 1024 * 1024)
            return BadRequest("File size exceeds 10MB limit");

        try
        {
            var uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            
            // Create uploads folder if it doesn't exist
            if (!Directory.Exists(uploadFolder))
                Directory.CreateDirectory(uploadFolder);

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadFolder, fileName);

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the relative URL
            var fileUrl = $"/uploads/{fileName}";
            
            _logger.LogInformation($"File uploaded successfully: {fileUrl}");
            
            return Ok(new { url = fileUrl, fileName = fileName });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file");
            return StatusCode(500, "Error uploading file");
        }
    }

    [HttpDelete("delete")]
    public IActionResult Delete([FromQuery] string fileName)
    {
        if (string.IsNullOrEmpty(fileName))
            return BadRequest("File name is required");

        try
        {
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", fileName);
            
            // Security: Ensure file is in uploads folder
            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            var fullPath = Path.GetFullPath(filePath);
            var fullUploadsPath = Path.GetFullPath(uploadsFolder);

            if (!fullPath.StartsWith(fullUploadsPath))
                return BadRequest("Invalid file path");

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                _logger.LogInformation($"File deleted: {fileName}");
                return Ok();
            }

            return NotFound("File not found");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file");
            return StatusCode(500, "Error deleting file");
        }
    }
}
